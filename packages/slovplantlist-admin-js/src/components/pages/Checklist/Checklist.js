import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Grid, Row, Col,
  Button, Glyphicon,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import filterFactory, {
  dateFilter, textFilter, multiSelectFilter, selectFilter,
  Comparator,
} from 'react-bootstrap-table2-filter';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import {
  LosName, PageTitle, SelectTableColumnsModal,
} from '@ibot/components';

import Can from 'components/segments/auth/Can';
import Ownership from 'components/segments/auth/Ownership';
import RemotePagination from 'components/segments/RemotePagination';

import config from 'config/config';
import { helperUtils } from 'utils';

import commonHooks from 'components/segments/hooks';

import SpeciesNameModal from './Modals/SpeciesNameModal';

const PAGE_DETAIL = '/checklist/detail/';
const EDIT_RECORD = '/checklist/edit/';
const NEW_RECORD = '/checklist/new';

const {
  constants: {
    listOfSpeciesColumn,
    ownership: ownershipColumn,
    insertedMethod: insertedMethodConfig,
    updatedMethod: updatedMethodConfig,
  },
  mappings,
} = config;

const ntypesOptions = helperUtils.buildFilterOptionsFromKeys(mappings.losType);
const ownershipOptionsAdmin = helperUtils.buildFilterOptionsFromKeys(
  mappings.ownership,
);
const { unassigned, others, ...ownershipOptionsAuthor } = ownershipOptionsAdmin;
const methodOptions = (opts) => Object.values(opts).map((v) => ({
  label: v,
  value: v,
}));

const getAllUri = config.uris.nomenclatureOwnersUri.getAllWFilterUri;
const getCountUri = config.uris.nomenclatureOwnersUri.countUri;

const columns = (isAuthor) => [
  {
    dataField: 'id',
    text: 'ID',
    filter: textFilter(),
    sort: true,
    headerStyle: { width: '80px' },
  },
  {
    dataField: 'action',
    text: 'Action',
  },
  {
    dataField: 'checkedTimestamp',
    text: 'Checked',
    formatter: (cell) => (cell ? (
      <Glyphicon glyph="ok" className="green" />
    ) : (
      <Glyphicon glyph="remove" className="red" />
    )),
    align: 'center',
    hidden: false,
  },
  {
    dataField: ownershipColumn,
    text: 'Ownership',
    filter: selectFilter({
      options: isAuthor ? ownershipOptionsAuthor : ownershipOptionsAdmin,
      defaultValue: ownershipOptionsAdmin.all,
      withoutEmptyOption: true,
    }),
    hidden: false,
  },
  {
    dataField: 'ntype',
    text: 'Type',
    filter: multiSelectFilter({
      options: ntypesOptions,
      comparator: Comparator.EQ,
    }),
    sort: true,
    hidden: false,
    headerStyle: { width: '150px' },
  },
  {
    dataField: listOfSpeciesColumn,
    text: 'Name',
    filter: textFilter(),
    sort: true,
    hidden: false,
  },
  {
    dataField: 'publication',
    text: 'Publication',
    filter: textFilter(),
    sort: true,
    hidden: false,
  },
  {
    dataField: 'acceptedNames',
    text: 'Accepted name (s)',
    filter: textFilter(),
    sort: true,
    hidden: false,
  },
  {
    dataField: 'createdTimestamp',
    text: 'Created at',
    filter: dateFilter(),
    sort: true,
    hidden: true,
  },
  {
    dataField: 'updatedTimestamp',
    text: 'Updated at',
    filter: dateFilter(),
    sort: true,
    hidden: true,
  },
  {
    dataField: 'insertedBy',
    text: 'Inserted by',
    filter: textFilter(),
    sort: true,
    hidden: true,
  },
  {
    dataField: 'insertedMethod',
    text: 'Inserted method',
    filter: selectFilter({
      options: methodOptions(insertedMethodConfig),
    }),
    sort: true,
    hidden: false,
    headerStyle: { width: '150px' },
  },
  {
    dataField: 'updatedBy',
    text: 'Updated by',
    filter: textFilter(),
    sort: true,
    hidden: true,
  },
  {
    dataField: 'updatedMethod',
    text: 'Updated method',
    filter: selectFilter({
      options: methodOptions(updatedMethodConfig),
    }),
    sort: true,
    hidden: false,
    headerStyle: { width: '150px' },
  },
];

const defaultSorted = [{
  dataField: 'id',
  order: 'asc',
}];

const formatResult = (records, user) => records.map(({
  id, accepted, idGenus, ownerNames, ...nomen
}) => ({
  ...nomen,
  id,
  action: (
    <Can
      role={user.role}
      perform="species:edit"
      data={{
        speciesGenusId: idGenus,
        userGeneraIds: user.userGenera,
      }}
      yes={() => (
        <LinkContainer to={`${EDIT_RECORD}${id}`}>
          <Button bsStyle="warning" bsSize="xsmall">Edit</Button>
        </LinkContainer>
      )}
    />
  ),
  [ownershipColumn]: (
    <Can
      role={user.role}
      perform="species:edit"
      data={{
        speciesGenusId: idGenus,
        userGeneraIds: user.userGenera,
      }}
      yes={() => (
        <Ownership role={user.role} isOwner owners={ownerNames} />
      )}
      no={() => (
        <Ownership
          role={user.role}
          isOwner={false}
          owners={ownerNames}
        />
      )}
    />
  ),
  [listOfSpeciesColumn]: (
    <span>
      <a href={`${PAGE_DETAIL}${id}`}>
        <LosName key={id} data={nomen} />
      </a>
      <Can
        role={user.role}
        perform="species:edit"
        data={{
          speciesGenusId: idGenus,
          userGeneraIds: user.userGenera,
        }}
        yes={() => (
          <small className="pull-right gray-text unselectable">
            Double click to quick edit
          </small>
        )}
      />
    </span>
  ),
  acceptedNames: (
    accepted.map(({ parent }, i) => [
      i > 0 && ', ',
      <a
        key={parent.id}
        href={`${PAGE_DETAIL}${parent.id}`}
      >
        <LosName data={parent} />
      </a>,
    ])
  ),
}));

const Checklist = () => {
  const accessToken = useSelector((state) => state.authentication.accessToken);
  const user = useSelector((state) => state.user);

  const {
    showModal, editId,
    handleShowModal, handleHideModal,
  } = commonHooks.useModal();

  const [tableColumns, setTableColumns] = useState(
    columns(user.role === mappings.userRole.author.name),
  );
  const [showModalColumns, setShowModalColumns] = useState(false);

  const ownerId = user ? user.id : undefined;
  const {
    page, sizePerPage, where, order, setValues,
  } = commonHooks.useTableChange(ownerId, 1);

  const { data, totalSize } = commonHooks.useTableData(
    getCountUri, getAllUri, accessToken, where, page,
    sizePerPage, order, showModal,
  );

  const rowEvents = {
    onDoubleClick: (e, row) => {
      if (user.role === mappings.userRole.author.name
        && !user.userGenera.includes(row.idGenus)) {
        return null;
      }
      return handleShowModal(row.id);
    },
  };

  const handleColumnToggle = (toggledDataField) => {
    const newTableColumns = tableColumns.map((val) => {
      if (val.dataField === toggledDataField) {
        return {
          ...val,
          hidden: !val.hidden,
        };
      }
      return val;
    });
    setTableColumns(newTableColumns);
  };

  const onTableChange = (type, {
    page: pageTable,
    sizePerPage: sizePerPageTable,
    filters,
    sortField,
    sortOrder,
  }) => (
    setValues({
      page: pageTable,
      sizePerPage: sizePerPageTable,
      filters,
      sortField,
      sortOrder,
    })
  );

  const paginationOptions = { page, sizePerPage, totalSize };
  return (
    <div id="checklist">
      <PageTitle title="Checklist - Slovplantlist" />
      <Grid id="functions-panel">
        <div id="functions">
          <Can
            role={user.role}
            perform="checklist:add"
            yes={() => (
              <Row>
                <Col md={2}>
                  <Button
                    bsStyle="success"
                    onClick={() => handleShowModal(undefined)}
                  >
                    <Glyphicon glyph="plus" />
                    {' '}
                    Add new quick
                  </Button>
                </Col>
                <Col md={2}>
                  <LinkContainer to={NEW_RECORD}>
                    <Button bsStyle="success">
                      <Glyphicon glyph="plus" />
                      {' '}
                      Add new full
                    </Button>
                  </LinkContainer>
                </Col>
              </Row>
            )}
          />
        </div>
      </Grid>
      <hr />
      <Grid>
        <h2>Checklist</h2>
        <p>All filters are case sensitive</p>
        <div>
          <small>
            * A = Accepted, PA = Provisionally accepted, S = Synonym,
            {' '}
            DS = Doubtful synonym, U = Unresolved
          </small>
        </div>
      </Grid>
      <Grid fluid>
        <hr />
        <div>
          <Button
            bsStyle="primary"
            onClick={() => setShowModalColumns(true)}
          >
            Display columns
            {' '}
            <Glyphicon glyph="menu-down" />
          </Button>
        </div>
        <ToolkitProvider
          columnToggle
          keyField="id"
          data={formatResult(data, user)}
          columns={tableColumns}
        >
          {({ baseProps, columnToggleProps }) => (
            <div>
              <RemotePagination
                hover
                striped
                condensed
                remote
                keyField={baseProps.keyField}
                data={baseProps.data}
                columns={baseProps.columns}
                defaultSorted={defaultSorted}
                filter={filterFactory()}
                onTableChange={onTableChange}
                paginationOptions={paginationOptions}
                rowEvents={rowEvents}
                columnToggle={baseProps.columnToggle}
              />
              <SelectTableColumnsModal
                show={showModalColumns}
                onHide={() => setShowModalColumns(false)}
                toggleListProps={{
                  columns: columnToggleProps.columns,
                  toggles: columnToggleProps.toggles,
                  onColumnToggle: handleColumnToggle,
                }}
              />
            </div>
          )}
        </ToolkitProvider>
      </Grid>
      <SpeciesNameModal
        id={editId}
        show={showModal}
        onHide={() => handleHideModal()}
      />
    </div>
  );
};

export default Checklist;
