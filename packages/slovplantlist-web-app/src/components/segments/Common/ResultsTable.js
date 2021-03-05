import React from 'react';

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

import config from 'config';

const { pagination: paginationConfig } = config;
const defaultPage = 0;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
  },
  head: {
    '& th': {
      fontWeight: theme.typography.fontWeightBold,
      backgroundColor: theme.palette.background.paper,
    },
  },
  row: {},
}));

const ResultsTable = ({
  columns, keyField,
  data = [], totalSize = [], onTableChanged = () => { }, pagination = {},
}) => {
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    onTableChanged({
      page: newPage,
      rowsPerPage: pagination.rowsPerPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = event.target.value;
    onTableChanged({
      page: defaultPage,
      rowsPerPage: newRowsPerPage,
    });
  };

  const { page, rowsPerPage } = pagination;

  const dataToDisplay = data.map((d) => ({
    key: d[keyField],
    cols: columns.map(({
      dataField,
      formatter = (cell) => cell,
      hidden = false,
      align = 'left',
    }) => ({
      dataField,
      value: formatter(d[dataField], d),
      hidden,
      align,
    })),
  }));

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="scientific names table">
          <TableHead className={classes.head}>
            <TableRow>
              {columns.map(({
                dataField, text, hidden, align,
              }) => {
                if (hidden) {
                  return undefined;
                }
                return (
                  <TableCell
                    key={dataField}
                    align={align}
                  >
                    {text}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataToDisplay.map(({ key, cols }) => (
              <TableRow
                hover
                key={key}
                className={classes.row}
              >
                {cols.map(({
                  dataField, value, hidden, align,
                }) => {
                  if (hidden) {
                    return undefined;
                  }
                  return (
                    <TableCell
                      key={dataField}
                      align={align}
                    >
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={paginationConfig.rowsPerPageOptions}
        component="div"
        count={totalSize}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ResultsTable;

ResultsTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    dataField: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  keyField: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  totalSize: PropTypes.number,
  onTableChanged: PropTypes.func,
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  }),
};
ResultsTable.defaultProps = {
  data: [],
  totalSize: 0,
  onTableChanged: () => { },
  pagination: {},
};
