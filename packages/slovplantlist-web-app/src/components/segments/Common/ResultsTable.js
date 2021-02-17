/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

import { hooks } from '@ibot/core';

import config from '../../../config';

const { pagination } = config;
const defaultPage = 0;

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
  },
  head: {
    fontWeight: 'bold',
  },
  row: {
    hover: {
      cursor: 'pointer',
    },
  },
});

const ResultsTable = ({
  columns, keyField, getData, getTotalCount,
}) => {
  const classes = useStyles();

  const [page, setPage] = useState(defaultPage);
  const [rowsPerPage, setRowsPerPage] = useState(
    pagination.rowsPerPageOptions[0],
  );
  const {
    data, totalSize,
  } = hooks.useTableData(page, rowsPerPage, getTotalCount, getData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(defaultPage);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="scientific names table">
          <TableHead className={classes.head}>
            <TableRow>
              {columns.map(({ text }, i) => (
                <TableCell
                  key={i}
                  align={i === 0 ? 'left' : 'right'}
                >
                  {text}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d) => (
              <TableRow
                hover
                key={d[keyField]}
              >
                {columns.map(({ dataField }, i) => (
                  <TableCell
                    key={i}
                    align={i === 0 ? 'left' : 'right'}
                  >
                    {d[dataField]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 40]}
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
  getData: PropTypes.func.isRequired,
  getTotalCount: PropTypes.func.isRequired,
};
