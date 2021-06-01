import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  Toolbar, Button, Typography,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Done as DoneIcon,
  Clear as ClearIcon,
} from '@material-ui/icons';

import filterFactory, {
  textFilter, multiSelectFilter, Comparator,
} from 'react-bootstrap-table2-filter';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

import PropTypes from 'prop-types';
import LoggedUserType from 'components/propTypes/loggedUser';

import RemotePagination from 'components/segments/RemotePagination';
import Can from 'components/segments/auth/Can';
import { PageTitle } from '@ibot/components';

import config from 'config/config';
import { generaUtils } from '@ibot/utils';
import { helperUtils, notifications, miscUtils } from 'utils';

import commonHooks from 'components/segments/hooks';
import { genusFacade } from 'facades';

import GeneraModal from './Modals/GeneraModal';

const { mappings: { genusType: { A, S } } } = config;
const ntypesFilterOptions = helperUtils.buildFilterOptionsFromKeys({ A, S });
const ntypesSelectOptions = [A, S];

const getAllUri = config.uris.generaUri.getAllWFilterUri;
const getCountUri = config.uris.generaUri.countUri;

const columns = [
  {
    dataField: 'id',
    text: 'ID',
    sort: true,
    filter: textFilter(),
    editable: false,
  },
  {
    dataField: 'action',
    text: 'Actions',
    editable: false,
  },
  {
    dataField: 'checkedTimestamp',
    text: 'Checked',
    formatter: (cell) => (cell ? (
      <DoneIcon />
    ) : (
      <ClearIcon />
    )),
    align: 'center',
  },
  {
    dataField: 'ntype',
    text: 'Type',
    filter: multiSelectFilter({
      options: ntypesFilterOptions,
      comparator: Comparator.EQ,
    }),
    sort: true,
    editor: {
      type: Type.SELECT,
      options: ntypesSelectOptions,
    },
  },
  {
    dataField: 'name',
    text: 'Name',
    filter: textFilter({ caseSensitive: true }),
    sort: true,
  },
  {
    dataField: 'authors',
    text: 'Authors',
    filter: textFilter({ caseSensitive: true }),
    sort: true,
  },
  {
    dataField: 'vernacular',
    text: 'Vernacular',
    filter: textFilter({ caseSensitive: true }),
    sort: true,
  },
  {
    dataField: 'familyApg',
    text: 'Family APG',
    formatter: (cell) => (cell ? cell.name : undefined),
    editable: false,
    // TODO: figure out how to patch selected attribute - use custom renderer (TypeaheadCellEditRenderer)
    // this cell contains { id: 123, name: "abc", etc... }, we need to patch genus { idFamily: 123 }
  },
  {
    dataField: 'family',
    text: 'Family',
    formatter: (cell) => (cell ? cell.name : undefined),
    editable: false,
  },
  {
    dataField: 'acceptedNames',
    text: 'Accepted names',
    editable: false,
  },
];

const defaultSorted = [{
  dataField: 'name',
  order: 'asc',
}];

const formatResult = (records, userRole, handleShowModal) => (
  records.map(({
    id, 'family-apg': familyApg, accepted, ...genus
  }) => ({
    ...genus,
    id,
    action: (
      <Can
        role={userRole}
        perform="genus:edit"
        yes={() => (
          <Button
            size="small"
            color="primary"
            onClick={() => handleShowModal(id)}
          >
            Edit
          </Button>
        )}
      />),
    familyApg,
    acceptedNames: (
      <Can
        role={userRole}
        perform="genus:edit"
        yes={() => (
          accepted.map(({ parent }, i) => [
            i > 0 && ', ',
            <Button
              size="small"
              color="primary"
              key={parent.id}
              onClick={() => handleShowModal(parent.id)}
            >
              {generaUtils.formatGenus(parent.name)}
            </Button>,
          ])
        )}
      />
    ),
  }))
);

const Genera = ({ user, accessToken }) => {
  const [forceChange, setForceChange] = useState(false);

  const {
    showModal, editId, handleShowModal, handleHideModal,
  } = commonHooks.useModal();

  const ownerId = user ? user.id : undefined;
  const {
    page, sizePerPage, where, order, setValues,
  } = commonHooks.useTableChange(ownerId, 1);

  const forceFetch = miscUtils.boolsToStr(showModal, forceChange);

  const { data, totalSize } = commonHooks.useTableData(
    getCountUri, getAllUri, accessToken, where, page,
    sizePerPage, order, forceFetch,
  );

  const onTableChange = (type, {
    page: pageTable,
    sizePerPage: sizePerPageTable,
    filters,
    sortField,
    sortOrder,
    cellEdit = {},
  }) => {
    const { rowId, dataField, newValue } = cellEdit;
    const patch = async () => {
      try {
        if (rowId && dataField && newValue) {
          await genusFacade.patchGenus(rowId, dataField, newValue, accessToken);
          setForceChange(!forceChange);
        }

        setValues({
          page: pageTable,
          sizePerPage: sizePerPageTable,
          filters,
          sortField,
          sortOrder,
        });
      } catch (error) {
        notifications.error('Error saving');
        throw error;
      }
    };

    patch();
  };

  const paginationOptions = { page, sizePerPage, totalSize };

  return (
    <div id="genera">
      <PageTitle title="Genera - Slovplantlist" />
      <Toolbar>
        <Can
          role={user.role}
          perform="genus:edit"
          yes={() => (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleShowModal(undefined)}
              startIcon={<AddIcon />}
            >
              Add new
            </Button>
          )}
        />
      </Toolbar>
      <Typography variant="h4" component="h1">
        Genera
      </Typography>
      <RemotePagination
        hover
        striped
        condensed
        remote
        keyField="id"
        data={formatResult(data, user.role, handleShowModal)}
        columns={columns}
        defaultSorted={defaultSorted}
        filter={filterFactory()}
        onTableChange={onTableChange}
        paginationOptions={paginationOptions}
        cellEdit={cellEditFactory({ mode: 'dbclick' })}
      />
      <GeneraModal
        editId={editId}
        show={showModal}
        onHide={() => handleHideModal()}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.authentication.accessToken,
  user: state.user,
});

export default connect(mapStateToProps)(Genera);

Genera.propTypes = {
  user: LoggedUserType.type.isRequired,
  accessToken: PropTypes.string.isRequired,
};
