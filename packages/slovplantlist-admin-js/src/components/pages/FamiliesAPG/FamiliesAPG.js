import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Toolbar, Button, Typography,
} from '@material-ui/core';
import {
  Add as AddIcon,
} from '@material-ui/icons';

import Can from 'components/segments/auth/Can';

import { PageTitle, AdminDataGrid } from '@ibot/components';
import { hooks, helpers } from '@ibot/core';

import config from 'config/config';
import { helperUtils, whereUtils } from 'utils';

import { tablesFacade } from 'facades';
import {
  changePageActionFamiliesApg as changePageAction,
  changePageSizeActionFamiliesApg as changePageSizeAction,
  changeSortModelActionFamiliesApg as changeSortModelAction,
  changeFilterModelActionFamiliesApg as changeFilterModelAction,
  changeColumnVisibilityActionFamiliesApg as changeColumnVisibilityAction,
} from 'context/reducers/datagrid';

import FamiliesApgModal from './Modals/FamiliesApgModal';
import { columns } from './Table/columns';

const getAllUri = config.uris.familiesApgUri.getAllWFilterUri;
const getCountUri = config.uris.familiesApgUri.countUri;

const getTotalCount = tablesFacade.getCountForHook(getCountUri);
const getAll = tablesFacade.getAllForHook(getAllUri);

const {
  pagination: { sizePerPageList },
} = config;
const pageSizesList = sizePerPageList.map(({ value }) => value);

const FamiliesAPG = () => {
  const accessToken = useSelector((state) => state.authentication.accessToken);
  const user = useSelector((state) => state.user);
  const {
    page, pageSize, sortModel, filterModel, columnsChanges,
  } = useSelector((state) => state.datagrid.familiesApg);

  const dispatch = useDispatch();

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

  const {
    handlePageChange, handlePageSizeChange, handleSortModelChange,
    handleFilterModelChange, handleColumnVisibilityChange,
  } = helpers.dataGridHandlers(dispatch, {
    changePageAction,
    changePageSizeAction,
    changeSortModelAction,
    changeFilterModelAction,
    changeColumnVisibilityAction,
  });

  const gridColumns = columns(user.role, handleShowModal).map((c) => ({
    ...c,
    ...columnsChanges[c.field],
  }));

  return (
    <div id="families-apg">
      <PageTitle title="Families APG - Slovplantlist" />
      <Toolbar>
        <Can
          role={user.role}
          perform="familyAPG:edit"
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
      <Typography variant="h4" component="h1">
        Families APG
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
      <FamiliesApgModal
        id={editId}
        show={showModal}
        onHide={() => handleHideModal()}
      />
    </div>
  );
};

export default FamiliesAPG;
