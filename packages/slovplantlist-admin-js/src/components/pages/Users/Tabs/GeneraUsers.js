import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AdminDataGrid } from '@ibot/components';
import { hooks } from '@ibot/core';

import { tablesFacade } from 'facades';

import config from 'config/config';
import { whereUtils, helperUtils } from 'utils';

import {
  changePageActionGeneraUsers,
  changePageSizeActionGeneraUsers,
  changeSortModelActionGeneraUsers,
  changeFilterModelActionGeneraUsers,
  changeColumnVisibilityActionGeneraUsers,
} from 'context/reducers/datagrid';

import UsersGeneraModal from './Modals/UsersGeneraModal';

import { columns } from './Table/columns-genera-users';

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
    page, pageSize, sortModel, filterModel, columnsChanges,
  } = useSelector((state) => state.datagrid.generaUsers);

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
    dispatch(changePageActionGeneraUsers(p))
  );
  const handlePageSizeChange = ({ pageSize: ps }) => (
    dispatch(changePageSizeActionGeneraUsers(ps))
  );
  const handleSortModelChange = ({ sortModel: sm }) => (
    dispatch(changeSortModelActionGeneraUsers(sm))
  );
  const handleFilterModelChange = ({ filterModel: fm }) => (
    dispatch(changeFilterModelActionGeneraUsers(fm))
  );
  const handleColumnVisibilityChange = ({ field, isVisible }) => (
    dispatch(changeColumnVisibilityActionGeneraUsers(field, isVisible))
  );

  const gridColumns = columns(handleShowModal).map((c) => ({
    ...c,
    ...columnsChanges[c.field],
  }));

  return (
    <>
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
      <UsersGeneraModal
        user={data.find((u) => u.id === editId)}
        show={showModal}
        onHide={() => handleHideModal()}
      />
    </>
  );
};

export default GeneraUsers;
