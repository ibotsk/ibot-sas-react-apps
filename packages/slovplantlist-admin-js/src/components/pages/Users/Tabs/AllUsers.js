import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Toolbar, Button, Typography,
} from '@material-ui/core';
import {
  Add as AddIcon,
} from '@material-ui/icons';

import { AdminDataGrid } from '@ibot/components';
import { hooks } from '@ibot/core';

import Can from 'components/segments/auth/Can';

import config from 'config/config';
import { helperUtils, whereUtils } from 'utils';

import { tablesFacade } from 'facades';
import {
  changePageActionAllUsers,
  changePageSizeActionAllUsers,
  changeSortModelActionAllUsers,
  changeFilterModelActionAllUsers,
  changeColumnVisibilityActionAllUsers,
} from 'context/reducers/datagrid';

import UsersModal from './Modals/UsersModal';

import { columns } from './Table/columns-all-users';

const getAllUri = config.uris.usersUri.getAllWOrderUri;
const getCountUri = config.uris.usersUri.countUri;

const getTotalCount = tablesFacade.getCountForHook(getCountUri);
const getAll = tablesFacade.getAllForHook(getAllUri);

const {
  pagination: { sizePerPageList },
} = config;
const pageSizesList = sizePerPageList.map(({ value }) => value);

const AllUsers = () => {
  const accessToken = useSelector((state) => state.authentication.accessToken);
  const user = useSelector((state) => state.user);
  const {
    page, pageSize, sortModel, filterModel, columnsChanges,
  } = useSelector((state) => state.datagrid.allUsers);

  const {
    showModal, editId,
    handleShowModal, handleHideModal,
  } = hooks.useModal();

  const {
    data, totalSize, isLoading,
  } = hooks.useAdminTableData(
    getTotalCount, getAll,
    whereUtils.dataGridFilterModelToWhereString(filterModel),
    page, pageSize,
    helperUtils.dataGridSortModelStringify(sortModel),
    accessToken, showModal,
  );

  const dispatch = useDispatch();
  const handlePageChange = ({ page: p }) => (
    dispatch(changePageActionAllUsers(p))
  );
  const handlePageSizeChange = ({ pageSize: ps }) => (
    dispatch(changePageSizeActionAllUsers(ps))
  );
  const handleSortModelChange = ({ sortModel: sm }) => (
    dispatch(changeSortModelActionAllUsers(sm))
  );
  const handleFilterModelChange = ({ filterModel: fm }) => (
    dispatch(changeFilterModelActionAllUsers(fm))
  );
  const handleColumnVisibilityChange = ({ field, isVisible }) => (
    dispatch(changeColumnVisibilityActionAllUsers(field, isVisible))
  );

  const gridColumns = columns(handleShowModal).map((c) => ({
    ...c,
    ...columnsChanges[c.field],
  }));

  return (
    <>
      <Toolbar>
        <Can
          role={user.role}
          perform="genus:edit"
          yes={() => (
            <Button
              disableElevation
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
      <Typography component="ul" variant="body2">
        <li>ADMIN - has all rights</li>
        <li>EDITOR - can create and edit species, genera, families</li>
        <li>AUTHOR - can edit species from genus assigned to him</li>
      </Typography>
      <div style={{ height: '70vh', width: '100%' }}>
        <AdminDataGrid
          rows={data}
          columns={gridColumns}
          loading={isLoading}
          page={page}
          pageSize={pageSize}
          rowCount={totalSize}
          rowsPerPageOptions={pageSizesList}
          sortModel={sortModel}
          filterModel={filterModel}
          onPageSizeChange={handlePageSizeChange}
          onPageChange={handlePageChange}
          onSortModelChange={handleSortModelChange}
          onFilterModelChange={handleFilterModelChange}
          onColumnVisibilityChange={handleColumnVisibilityChange}
        />
      </div>
      <UsersModal
        editId={editId}
        show={showModal}
        onHide={() => handleHideModal()}
      />
    </>
  );
};

export default AllUsers;
