import React from 'react';
import { useSelector } from 'react-redux';

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

import commonHooks from 'components/segments/hooks';

import UsersModal from './Modals/UsersModal';

import { columns, defaultSortModel } from './Table/columns-all-users';

const getAllUri = config.uris.usersUri.getAllWOrderUri;
const getCountUri = config.uris.usersUri.countUri;

const {
  pagination: { sizePerPageList },
} = config;
const pageSizesList = sizePerPageList.map(({ value }) => value);

const AllUsers = () => {
  const accessToken = useSelector((state) => state.authentication.accessToken);
  const user = useSelector((state) => state.user);

  const {
    showModal, editId,
    handleShowModal, handleHideModal,
  } = commonHooks.useModal();

  const {
    page, pageSize, order, where,
    handlePageChange, handleOrderChange, handlePageSizeChange,
    handleWhereChange,
  } = hooks.useDataGridChange(null, 0, pageSizesList[2], { pageBase: 1 });

  const {
    data, totalSize, isLoading,
  } = commonHooks.useTableData(
    getCountUri, getAllUri, accessToken, where, page,
    pageSize, order, showModal,
  );

  const handleSortModelChange = (params) => (
    handleOrderChange(
      params, helperUtils.dataGridSortModelMapper(defaultSortModel),
    )
  );
  const handleFilterModelChange = (params) => (
    handleWhereChange(params, whereUtils.dataGridFilterModelToWhereString)
  );

  return (
    <>
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
      <Typography component="ul" variant="body2">
        <li>ADMIN - has all rights</li>
        <li>EDITOR - can create and edit species, genera, families</li>
        <li>AUTHOR - can edit species from genus assigned to him</li>
      </Typography>
      <div style={{ height: '70vh', width: '100%' }}>
        <AdminDataGrid
          rows={data}
          columns={columns(handleShowModal)}
          rowCount={totalSize}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          rowsPerPageOptions={pageSizesList}
          onPageChange={handlePageChange}
          loading={isLoading}
          sortModel={defaultSortModel}
          onSortModelChange={handleSortModelChange}
          onFilterModelChange={handleFilterModelChange}
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
