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
  changePageActionGenera,
  changePageSizeActionGenera,
  changeSortModelActionGenera,
  changeFilterModelActionGenera,
  changeColumnVisibilityActionGenera,
} from 'context/reducers/datagrid';

import GeneraModal from './Modals/GeneraModal';
import { columns } from './Table/columns';

const getAllUri = config.uris.generaUri.getAllWFilterUri;
const getCountUri = config.uris.generaUri.countUri;

const getTotalCount = tablesFacade.getCountForHook(getCountUri);
const getAll = tablesFacade.getAllForHook(getAllUri);

const {
  pagination: { sizePerPageList },
} = config;
const pageSizesList = sizePerPageList.map(({ value }) => value);

const Genera = () => {
  const accessToken = useSelector((state) => state.authentication.accessToken);
  const user = useSelector((state) => state.user);
  const {
    page, pageSize, sortModel, filterModel, columnsChanges,
  } = useSelector((state) => state.datagrid.genera);

  const dispatch = useDispatch();

  const {
    showModal, editId, handleShowModal, handleHideModal,
  } = hooks.useModal();

  const {
    data, totalSize, isLoading,
  } = hooks.useAdminTableData(
    getTotalCount, getAll,
    whereUtils.dataGridFilterModelToWhereString(filterModel),
    page, pageSize,
    helperUtils.dataGridSortModelStringify(sortModel),
    accessToken,
  );

  const handlePageChange = ({ page: p }) => (
    dispatch(changePageActionGenera(p))
  );
  const handlePageSizeChange = ({ pageSize: ps }) => (
    dispatch(changePageSizeActionGenera(ps))
  );
  const handleSortModelChange = ({ sortModel: sm }) => (
    dispatch(changeSortModelActionGenera(sm))
  );
  const handleFilterModelChange = ({ filterModel: fm }) => (
    dispatch(changeFilterModelActionGenera(fm))
  );
  const handleColumnVisibilityChange = ({ field, isVisible }) => (
    dispatch(changeColumnVisibilityActionGenera(field, isVisible))
  );

  const gridColumns = columns(user.role, handleShowModal).map((c) => ({
    ...c,
    ...columnsChanges[c.field],
  }));

  return (
    <>
      <PageTitle title="Genera - Slovplantlist" />
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
      <Typography variant="h4" component="h1">
        Genera
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
      <GeneraModal
        editId={editId}
        show={showModal}
        onHide={() => handleHideModal()}
      />
    </>
  );
};

export default Genera;
