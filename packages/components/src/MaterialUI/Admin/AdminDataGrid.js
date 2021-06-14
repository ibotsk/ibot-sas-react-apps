/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  DataGrid, GridOverlay,
  GridToolbarColumnsButton, GridToolbarContainer, GridToolbarFilterButton,
} from '@material-ui/data-grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Paper } from '@material-ui/core';

const CustomLoadingOverlay = () => (
  <GridOverlay>
    <div style={{ position: 'absolute', top: 0, width: '100%' }}>
      <LinearProgress />
    </div>
  </GridOverlay>
);

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarColumnsButton />
    <GridToolbarFilterButton />
  </GridToolbarContainer>
);

const AdminDataGrid = (props) => (
  <Paper style={{ width: '100%', height: '100%' }} elevation={0}>
    <DataGrid
      pagination
      paginationMode="server"
      sortingOrder={['desc', 'asc']}
      filterMode="server"
      components={{
        LoadingOverlay: CustomLoadingOverlay,
        Toolbar: CustomToolbar,
      }}
      {...props}
    />
  </Paper>
);

export default AdminDataGrid;
