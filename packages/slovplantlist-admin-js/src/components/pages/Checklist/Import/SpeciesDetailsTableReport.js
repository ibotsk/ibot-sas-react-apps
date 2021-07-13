/* eslint-disable react/no-array-index-key */
import React from 'react';

import {
  Box, Collapse, IconButton, Paper, Typography,
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
} from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import amber from '@material-ui/core/colors/amber';
import deepOrange from '@material-ui/core/colors/deepOrange';

import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@material-ui/icons';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { LosName } from '@ibot/components';

import PropTypes from 'prop-types';
import SpeciesType from 'components/propTypes/species';

import config from 'config/config';
import importConfig from 'config/import';

const {
  mappings: {
    synonymBySyntype,
    synonym: synonymConfig,
    losType,
  },
} = config;
const {
  constants: {
    operation: operationConfig,
    // messages: messagesConfig,
  },
} = importConfig;

const styledBy = (property, mapping) => (props) => mapping[props[property]];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  collapsePaper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

const columns = [
  {
    id: 'rowId',
    label: 'Row',
  },
  {
    id: 'ntype',
    label: 'Status',
    format: (_, row) => {
      const type = losType[row.record.ntype] || {};
      return (
        <Box color={type.color || '#000'}>
          {row.record.ntype}
        </Box>
      );
    },
  },
  {
    id: 'syntype',
    label: 'Syn. type',
    format: (_, row) => {
      const { syntype } = row;
      const key = synonymBySyntype[syntype];
      if (!key) {
        return syntype;
      }
      return synonymConfig[key].prefix;
    },
  },
  {
    id: 'record',
    label: 'Name',
    format: (value) => (
      <LosName data={value} format="italic" isAggregates />
    ),
  },
  {
    id: 'operation',
    label: 'Operation',
    format: (value) => (
      <Box color={operationConfig[value].color}>
        {operationConfig[value].text}
      </Box>
    ),
  },
];

const rowClasses = (row) => {
  const { duplicates, errors, save } = row;
  let classes = 'default';

  if (duplicates && duplicates.length > 0) {
    classes = 'duplicates';
  }
  if (!save) {
    classes = 'nosave';
  }
  // overrides anything else before
  if (errors && errors.length > 0) {
    classes = 'errors';
  }
  return classes;
};

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: styledBy('color', {
      default: theme.palette.background.paper,
      duplicates: blue['100'],
      nosave: amber['100'],
      errors: deepOrange['100'],
    }),
    '& > *': {
      borderBottom: 'unset',
    },
  },
}))(TableRow);

const ExpandableRow = ({ row }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { duplicates = [], errors = [], save } = row;

  const rowColor = rowClasses(row);

  return (
    <>
      <StyledTableRow
        tabIndex={-1}
        color={rowColor}
      >
        <TableCell>
          {rowColor !== 'default' && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {
                column.format
                  ? column.format(value, row)
                  : value
              }
            </TableCell>
          );
        })}
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Paper className={classes.collapsePaper} elevation={0}>
              {save === false && (
                <Typography>
                  This record is created/updated earlier.
                  Only new accepted name will be assigned.
                </Typography>
              )}
              {duplicates.length > 0 && (
                <Typography>
                  Duplicate of rows:
                  {' '}
                  {duplicates.join(', ')}
                </Typography>
              )}
              {errors.length > 0 && (
                <>
                  <Typography>Errors:</Typography>
                  <ul>
                    {errors.map((e, i) => <li key={i}>{e.message}</li>)}
                  </ul>
                </>
              )}
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const SpeciesDetailsTableReport = ({ data }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} variant="outlined" elevation={0}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell />
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <ExpandableRow key={row.rowId} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default SpeciesDetailsTableReport;

SpeciesDetailsTableReport.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    rowId: PropTypes.number.isRequired,
    operation: PropTypes.string.isRequired,
    record: SpeciesType.type.isRequired,
    duplicates: PropTypes.arrayOf(PropTypes.number).isRequired,
    errors: PropTypes.arrayOf(PropTypes.shape({
      message: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
};
ExpandableRow.propTypes = {
  row: PropTypes.shape({
    save: PropTypes.bool.isRequired,
    duplicates: PropTypes.arrayOf(PropTypes.number).isRequired,
    errors: PropTypes.arrayOf(PropTypes.shape({
      message: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};
