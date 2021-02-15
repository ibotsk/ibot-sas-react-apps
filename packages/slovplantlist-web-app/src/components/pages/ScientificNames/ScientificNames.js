import React, { useState } from 'react';

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { hooks } from '@ibot/core';

import Title from '../../segments/Common/Title';

/* temporary fetching */
const rows = [...Array(70).keys()].map((i) => ({
  id: i,
  status: 'Accepted',
  name: 'Lorem ipsum',
  accepted: 'Lorem ipsum',
}));

const getCount = () => rows.length;
const getData = (limit, offset) => rows.slice(offset, offset + limit);

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

const ScientificNames = () => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {
    data, totalSize,
  } = hooks.useTableData(page, rowsPerPage, getCount, getData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Title>Scientific Names</Title>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="scientific names table">
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Accepted name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(({
                id, status, name, accepted,
              }) => (
                <TableRow
                  hover
                  key={id}
                >
                  <TableCell>{name}</TableCell>
                  <TableCell align="right">{status}</TableCell>
                  <TableCell align="right">{accepted}</TableCell>
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
    </>
  );
};

export default ScientificNames;
