/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  DataGrid, GridOverlay, useGridSlotComponentProps,
  GridToolbarColumnsButton, GridToolbarContainer, GridToolbarFilterButton,
} from '@material-ui/data-grid';
import {
  Box,
  FormControl, NativeSelect, Typography,
  Paper, LinearProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
  },
  selectForm: {
    display: 'inline-flex',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    boxSizing: 'content-box',
  },
  selectInput: {
    fontSize: theme.typography.body2.fontSize,
  },
}));

const CustomLoadingOverlay = () => (
  <GridOverlay>
    <Box position="absolute" top={0} width="100%">
      <LinearProgress />
    </Box>
  </GridOverlay>
);

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarColumnsButton />
    <GridToolbarFilterButton />
  </GridToolbarContainer>
);

const CustomPagination = () => {
  const classes = useStyles();
  const { state, apiRef, options } = useGridSlotComponentProps();

  return (
    <div className={classes.root}>
      <Typography variant="body2">Page size:</Typography>
      <FormControl size="small" className={classes.selectForm}>
        <NativeSelect
          disableUnderline
          value={state.pagination.pageSize}
          onChange={(event) => apiRef.current.setPageSize(event.target.value)}
          inputProps={{
            className: classes.selectInput,
          }}
        >
          {options.rowsPerPageOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </NativeSelect>
      </FormControl>
      <Box marginLeft={1} marginRight={2}>
        <Typography variant="body2">
          {`Total rows: ${state.pagination.rowCount}`}
        </Typography>
      </Box>
      <Pagination
        showFirstButton
        showLastButton
        color="primary"
        count={state.pagination.pageCount}
        page={state.pagination.page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    </div>
  );
};

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
        Pagination: CustomPagination,
      }}
      {...props}
    />
  </Paper>
);

export default AdminDataGrid;
