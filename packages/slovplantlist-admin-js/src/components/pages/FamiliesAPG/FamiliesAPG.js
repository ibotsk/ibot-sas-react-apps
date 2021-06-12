import React from 'react';
import { useSelector } from 'react-redux';

import {
  Toolbar, Button, Typography,
} from '@material-ui/core';
import {
  Add as AddIcon,
} from '@material-ui/icons';

import Can from 'components/segments/auth/Can';

import { PageTitle, AdminDataGrid } from '@ibot/components';
import { hooks } from '@ibot/core';

import config from 'config/config';
import { helperUtils, whereUtils } from 'utils';

import commonHooks from 'components/segments/hooks';

import FamiliesApgModal from './Modals/FamiliesApgModal';
import { columns, defaultSortModel } from './Table/columns';

const getAllUri = config.uris.familiesApgUri.getAllWFilterUri;
const getCountUri = config.uris.familiesApgUri.countUri;

const {
  pagination: { sizePerPageList },
} = config;
const pageSizesList = sizePerPageList.map(({ value }) => value);

const FamiliesAPG = () => {
  const accessToken = useSelector((state) => state.authentication.accessToken);
  const user = useSelector((state) => state.user);

  const {
    showModal, editId,
    handleShowModal, handleHideModal,
  } = commonHooks.useModal();

  const ownerId = user ? user.id : undefined;

  const {
    page, pageSize, order, where,
    handlePageChange, handleOrderChange, handlePageSizeChange,
    handleWhereChange,
  } = hooks.useDataGridChange(ownerId, 0, pageSizesList[2], { pageBase: 1 });

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
      <div style={{ height: '70vh', width: '100%' }}>
        <AdminDataGrid
          rows={data}
          columns={columns(user.role, handleShowModal)}
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
      <FamiliesApgModal
        id={editId}
        show={showModal}
        onHide={() => handleHideModal()}
      />
    </div>
  );
};

export default FamiliesAPG;
