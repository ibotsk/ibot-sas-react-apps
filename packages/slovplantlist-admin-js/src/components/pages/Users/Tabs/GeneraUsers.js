import React from 'react';
import { useSelector } from 'react-redux';

import { AdminDataGrid } from '@ibot/components';
import { hooks } from '@ibot/core';

import { tablesFacade } from 'facades';
import commonHooks from 'components/segments/hooks';

import config from 'config/config';
import { whereUtils, helperUtils } from 'utils';

import UsersGeneraModal from './Modals/UsersGeneraModal';

import { columns, defaultSortModel } from './Table/columns-genera-users';

const getAllUri = config.uris.usersUri.getAllWGeneraUri;
const getCountUri = config.uris.usersUri.countUri;

const getTotalCount = tablesFacade.getCountForHook(getCountUri);
const getAll = tablesFacade.getAllForHook(getAllUri);

const {
  pagination: { sizePerPageList },
} = config;
const pageSizesList = sizePerPageList.map(({ value }) => value);

const GeneraUsers = () => {
  const accessToken = useSelector((state) => state.authentication.accessToken);

  const {
    showModal, editId,
    handleShowModal, handleHideModal,
  } = hooks.useModal();

  const {
    page, pageSize, order, where,
    handlePageChange, handleOrderChange, handlePageSizeChange,
    handleWhereChange,
  } = hooks.useDataGridChange(null, 0, pageSizesList[2]);

  const {
    data, totalSize, isLoading,
  } = commonHooks.useTableData(
    getTotalCount, getAll, where, page, pageSize, order, accessToken, showModal,
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
    <div>
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
      <UsersGeneraModal
        user={data.find((u) => u.id === editId)}
        show={showModal}
        onHide={() => handleHideModal()}
      />
    </div>
  );
};

export default GeneraUsers;
