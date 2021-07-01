import React from 'react';
import { useSelector } from 'react-redux';

import {
  Toolbar, Button, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Add as AddIcon,
  Publish as PublishIcon,
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
import { tablesFacade } from 'facades';
import { filterManager } from 'handlers';

import { columns, defaultSortModel } from './Table/columns';
import ChecklistImportModal from './Import/ChecklistImportModal';

const {
  mappings,
  pagination: { sizePerPageList },
} = config;

const pageSizesList = sizePerPageList.map(({ value }) => value);

const getCountUri = config.uris.nomenclatureOwnersUri.countUri;
const getAllUri = config.uris.nomenclatureOwnersUri.getAllWFilterUri;

const getTotalCount = tablesFacade.getCountForHook(getCountUri);
const getAll = tablesFacade.getAllForHook(getAllUri);

const useStyles = makeStyles((theme) => ({
  toolbar: {
    '& > *': {
      marginRight: theme.spacing(2),
    },
  },
}));

const Checklist = () => {
  const classes = useStyles();
  const accessToken = useSelector((state) => state.authentication.accessToken);
  const user = useSelector((state) => state.user);

  const {
    showModal: showEditModal, editId,
    handleShowModal: handleShowEditModal,
    handleHideModal: handleHideEditModal,
  } = hooks.useModal();

  const {
    showModal: showImportModal,
    handleShowModal: handleShowImportModal,
    handleHideModal: handleHideImportModal,
  } = hooks.useModal();

  const ownerId = user ? user.id : undefined;

  const {
    page, pageSize, order, where,
    handlePageChange, handleOrderChange, handlePageSizeChange,
    handleWhereChange,
  } = hooks.useDataGridChange(ownerId, 0, pageSizesList[2]);

  const { data, totalSize, isLoading } = commonHooks.useTableData(
    getTotalCount, getAll, where, page, pageSize, order,
    accessToken, showEditModal,
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
      <Toolbar className={classes.toolbar}>
        <Can
          role={user.role}
          perform="checklist:add"
          yes={() => (
            <>
              <Button
                disableElevation
                variant="contained"
                color="secondary"
                onClick={() => handleShowEditModal(undefined)}
                startIcon={<AddIcon />}
              >
                Add new
              </Button>
              <Button
                disableElevation
                variant="contained"
                color="default"
                onClick={() => handleShowImportModal(undefined)}
                startIcon={<PublishIcon />}
              >
                Import
              </Button>
            </>
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
            handleShowEditModal,
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
        show={showEditModal}
        onHide={handleHideEditModal}
      />
      <ChecklistImportModal
        show={showImportModal}
        onHide={handleHideImportModal}
      />
      <NotificationContainer />
    </div>
  );
};

export default Checklist;
