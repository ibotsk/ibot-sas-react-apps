import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

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

import { tablesFacade } from 'facades';
import { filterManager } from 'handlers';
import {
  changePageActionChecklist,
  changePageSizeActionChecklist,
  changeSortModelActionChecklist,
  changeFilterModelActionChecklist,
  changeColumnVisibilityActionChecklist,
} from 'context/reducers/datagrid';

import { columns } from './Table/columns';
import ChecklistImportModal from './Import/ChecklistImportModal';

const {
  constants,
  mappings,
  pagination: { sizePerPageList },
  nomenclature,
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

const sortModelStringify = (sm) => {
  const newSm = helperUtils.dataGridSortModelHandler(
    constants.columns.speciesName, nomenclature.filter.listOfSpecies,
  )(sm);
  return helperUtils.dataGridSortModelStringify(newSm);
};
const filterModelToWhere = (fm) => {
  const { linkOperator } = fm;
  const whereItems = filterManager.execute(fm);
  return whereUtils.makeWhereString(whereItems, linkOperator);
};

const Checklist = () => {
  const classes = useStyles();
  const accessToken = useSelector((state) => state.authentication.accessToken);
  const user = useSelector((state) => state.user);
  const {
    page, pageSize, sortModel, filterModel, columnsChanges,
  } = useSelector((state) => state.datagrid.checklist);

  const dispatch = useDispatch();

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

  const { data, totalSize, isLoading } = hooks.useAdminTableData(
    getTotalCount, getAll,
    filterModelToWhere(filterModel),
    page, pageSize,
    sortModelStringify(sortModel),
    accessToken, showEditModal,
  );

  const handlePageChange = ({ page: p }) => (
    dispatch(changePageActionChecklist(p))
  );
  const handlePageSizeChange = ({ pageSize: ps }) => (
    dispatch(changePageSizeActionChecklist(ps))
  );
  const handleSortModelChange = ({ sortModel: sm }) => (
    dispatch(changeSortModelActionChecklist(sm))
  );
  const handleFilterModelChange = async ({ filterModel: fm }) => (
    dispatch(changeFilterModelActionChecklist(fm))
  );
  const handleColumnVisibilityChange = ({ field, isVisible }) => (
    dispatch(changeColumnVisibilityActionChecklist(field, isVisible))
  );

  const gridColumns = columns(user.role === mappings.userRole.author.name,
    user, handleShowEditModal).map((c) => ({
    ...c,
    ...columnsChanges[c.field],
  }));

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
