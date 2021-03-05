/* eslint-disable react/no-array-index-key */
import React from 'react';

import {
  Table, TableBody, TableRow, TableCell,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import config from 'config';

const {
  pagination: { rowsPerPageOptions },
} = config;

const SkeletonTable = () => (
  <Table>
    <TableBody>
      {[...Array(rowsPerPageOptions[0] + 2)].map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default SkeletonTable;
