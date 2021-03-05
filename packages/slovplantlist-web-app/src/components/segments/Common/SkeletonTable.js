/* eslint-disable react/no-array-index-key */
import React from 'react';

import { Table, TableBody, TableRow } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

import config from 'config';

const {
  pagination: { rowsPerPageOptions },
} = config;

const useStyle = makeStyles(() => ({
  skeletonTable: {
    '& tr': {
      height: 53,
    },
  },
}));

const SkeletonTable = () => {
  const classes = useStyle();

  return (
    <Table className={classes.skeletonTable}>
      <TableBody>
        {[...Array(rowsPerPageOptions[0] + 2)].map((_, i) => (
          <TableRow key={i}>
            <Skeleton
              variant="rect"
              height={50}
              component="td"
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SkeletonTable;
