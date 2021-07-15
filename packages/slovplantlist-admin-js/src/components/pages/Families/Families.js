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
import { hooks } from '@ibot/core';

import config from 'config/config';
import { helperUtils, whereUtils } from 'utils';

import { tablesFacade } from 'facades';
import {
  changePageActionFamilies,
  changePageSizeActionFamilies,
  changeSortModelActionFamilies,
  changeFilterModelActionFamilies,
  changeColumnVisibilityActionFamilies,
} from 'context/reducers/datagrid';

import FamiliesModal from './Modals/FamiliesModal';
import { columns } from './Table/columns';

const getAllUri = config.uris.familiesUri.getAllWFilterUri;
const getCountUri = config.uris.familiesUri.countUri;

const getTotalCount = tablesFacade.getCountForHook(getCountUri);
const getAll = tablesFacade.getAllForHook(getAllUri);

const {
  pagination: { sizePerPageList },
} = config;
const pageSizesList = sizePerPageList.map(({ value }) => value);

const Families = () => {
  const accessToken = useSelector((state) => state.authentication.accessToken);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const {
    page, pageSize, sortModel, filterModel, columnsChanges,
  } = useSelector((state) => state.datagrid.families);

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

  const handlePageChange = ({ page: p }) => (
    dispatch(changePageActionFamilies(p))
  );
  const handlePageSizeChange = ({ pageSize: ps }) => (
    dispatch(changePageSizeActionFamilies(ps))
  );
  const handleSortModelChange = ({ sortModel: sm }) => (
    dispatch(changeSortModelActionFamilies(sm))
  );
  const handleFilterModelChange = ({ filterModel: fm }) => (
    dispatch(changeFilterModelActionFamilies(fm))
  );
  const handleColumnVisibilityChange = ({ field, isVisible }) => (
    dispatch(changeColumnVisibilityActionFamilies(field, isVisible))
  );

  const gridColumns = columns(user.role, handleShowModal).map((c) => ({
    ...c,
    ...columnsChanges[c.field],
  }));

  return (
    <>
      <PageTitle title="Families - Slovplantlist" />
      <Toolbar>
        <Can
          role={user.role}
          perform="family:edit"
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
        Families
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
      <FamiliesModal
        id={editId}
        show={showModal}
        onHide={() => handleHideModal()}
      />
    </>
  );
};

export default Families;
