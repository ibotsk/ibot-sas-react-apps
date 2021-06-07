/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import LinearProgress from '@material-ui/core/LinearProgress';

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

const AdminDataGrid = (props) => (
  <DataGrid
    pagination
    paginationMode="server"
    sortingOrder={['desc', 'asc']}
    filterMode="server"
    components={{
      LoadingOverlay: CustomLoadingOverlay,
    }}
    {...props}
  />
);

export default AdminDataGrid;
