import React from 'react';
import { useSelector } from 'react-redux';

import {
  Toolbar, Button, Typography,
} from '@material-ui/core';
import {
  Add as AddIcon,
} from '@material-ui/icons';

import { NotificationContainer } from 'react-notifications';

import {
  PageTitle, AdminDataGrid,
} from '@ibot/components';
import { hooks } from '@ibot/core';

import Can from 'components/segments/auth/Can';
import SpeciesRecordModal
  from 'components/pages/SpeciesRecord/SpeciesRecordModal';

import config from 'config/config';
import { helperUtils, whereUtils } from 'utils';

import commonHooks from 'components/segments/hooks';
import { filterManager } from 'handlers';

import { columns, defaultSortModel } from './Table/columns';

const {
  mappings,
  pagination: { sizePerPageList },
} = config;

const pageSizesList = sizePerPageList.map(({ value }) => value);

const getAllUri = config.uris.nomenclatureOwnersUri.getAllWFilterUri;
const getCountUri = config.uris.nomenclatureOwnersUri.countUri;

const Checklist = () => {
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

  const { data, totalSize, isLoading } = commonHooks.useTableData(
    getCountUri, getAllUri, accessToken, where, page,
    pageSize, order, showModal,
  );

  const handleSortModelChange = (params) => (
    handleOrderChange(
      params, helperUtils.dataGridSortModelMapper(defaultSortModel),
    )
  );
  const handleFilterModelChange = async (params) => {
    const whereFromFilter = (fm) => {
      const { linkOperator } = fm;
      const whereItems = filterManager.execute(fm, { ownerId });
      return whereUtils.makeWhereString(whereItems, linkOperator);
    };
    handleWhereChange(
      params, whereFromFilter,
    );
  };

  return (
    <div id="checklist">
      <PageTitle title="Checklist - Slovplantlist" />
      <Toolbar>
        <Can
          role={user.role}
          perform="checklist:add"
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
        Checklist
      </Typography>
      <Typography variant="body2">
        <small>
          * A = Accepted, PA = Provisionally accepted, S = Synonym,
          {' '}
          DS = Doubtful synonym, U = Unresolved
        </small>
      </Typography>
      <div style={{ height: '70vh', width: '100%' }}>
        <AdminDataGrid
          rows={data}
          columns={columns(
            user.role === mappings.userRole.author.name,
            user,
            handleShowModal,
          )}
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
      <SpeciesRecordModal
        editId={editId}
        show={showModal}
        onHide={handleHideModal}
      />
      <NotificationContainer />
    </div>
  );
};

export default Checklist;
