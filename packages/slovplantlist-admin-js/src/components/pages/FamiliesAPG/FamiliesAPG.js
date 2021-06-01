import React from 'react';
import { connect } from 'react-redux';

import {
  Toolbar, Button, Typography,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Done as DoneIcon,
  Clear as ClearIcon,
} from '@material-ui/icons';

import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import PropTypes from 'prop-types';
import LoggedUserType from 'components/propTypes/loggedUser';

import Can from 'components/segments/auth/Can';
import RemotePagination from 'components/segments/RemotePagination';
import { PageTitle } from '@ibot/components';

import config from 'config/config';

import commonHooks from 'components/segments/hooks';

import FamiliesApgModal from './Modals/FamiliesApgModal';

const getAllUri = config.uris.familiesApgUri.getAllWFilterUri;
const getCountUri = config.uris.familiesApgUri.countUri;

const columns = [
  {
    dataField: 'id',
    text: 'ID',
    filter: textFilter(),
    sort: true,
  },
  {
    dataField: 'action',
    text: 'Actions',
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
    dataField: 'name',
    text: 'Name',
    filter: textFilter(),
    sort: true,
  },
  {
    dataField: 'vernacular',
    text: 'Vernacular',
    filter: textFilter(),
    sort: true,
  },
];

const defaultSorted = [{
  dataField: 'name',
  order: 'asc',
}];

const FamiliesAPG = ({ user, accessToken }) => {
  const {
    showModal, editId,
    handleShowModal, handleHideModal,
  } = commonHooks.useModal();

  const ownerId = user ? user.id : undefined;
  const {
    page, sizePerPage, where, order, setValues,
  } = commonHooks.useTableChange(ownerId, 1);

  const { data, totalSize } = commonHooks.useTableData(
    getCountUri, getAllUri, accessToken, where, page,
    sizePerPage, order, showModal,
  );

  const formatResult = (records) => records.map((d) => ({
    id: d.id,
    action: (
      <Can
        role={user.role}
        perform="familyAPG:edit"
        yes={() => (
          <Button
            size="small"
            color="primary"
            onClick={() => handleShowModal(d.id)}
          >
            Edit
          </Button>
        )}
      />
    ),
    name: d.name,
    vernacular: d.vernacular,
    checkedTimestamp: d.checkedTimestamp,
  }));

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
    <div id="families-apg">
      <PageTitle title="Families APG - Slovplantlist" />
      <Toolbar>
        <Can
          role={user.role}
          perform="familyAPG:edit"
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
        Families APG
      </Typography>
      <RemotePagination
        hover
        striped
        condensed
        remote
        keyField="id"
        data={formatResult(data)}
        columns={columns}
        defaultSorted={defaultSorted}
        filter={filterFactory()}
        onTableChange={onTableChange}
        paginationOptions={paginationOptions}
      />
      <FamiliesApgModal
        id={editId}
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

export default connect(mapStateToProps)(FamiliesAPG);

FamiliesAPG.propTypes = {
  user: LoggedUserType.type.isRequired,
  accessToken: PropTypes.string.isRequired,
};
