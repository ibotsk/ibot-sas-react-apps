/* eslint-disable react/no-array-index-key */
import React from 'react';

import { Label } from 'react-bootstrap';
import { BootstrapTable, LosName } from '@ibot/components';

import PropTypes from 'prop-types';
import SpeciesType from 'components/propTypes/species';

import config from 'config/config';
import importConfig from 'config/import';

const {
  mappings: {
    synonymBySyntype,
    synonym: synonymConfig,
  },
} = config;
const {
  constants: {
    operation: operationConfig,
    messages: messagesConfig,
  },
} = importConfig;

const columns = [
  {
    dataField: 'rowId',
    text: 'Row',
  },
  {
    dataField: 'ntype',
    text: 'Status',
    formatter: (cell, row) => row.record.ntype,
  },
  {
    dataField: 'syntype',
    text: 'Syn. type',
    formatter: (cell, row) => {
      const { syntype } = row;
      const key = synonymBySyntype[syntype];
      if (!key) {
        return syntype;
      }
      return synonymConfig[key].prefix;
    },
  },
  {
    dataField: 'record',
    text: 'Name',
    formatter: (cell, row, rowIndex) => (
      <LosName key={rowIndex} data={cell} format="italic" isAggregates />
    ),
  },
  {
    dataField: 'operation',
    text: 'Operation',
    formatter: (cell) => (
      <Label bsStyle={operationConfig[cell].colour}>
        {operationConfig[cell].text}
      </Label>
    ),
  },
];

const rowClasses = (row) => {
  const { duplicates, errors, save } = row;
  let classes;

  if (duplicates && duplicates.length > 0) {
    classes = messagesConfig.duplicates;
  }
  if (!save) {
    classes = messagesConfig.nosave;
  }
  // overrides anything else before
  if (errors && errors.length > 0) {
    classes = messagesConfig.errors;
  }
  return classes;
};

const expandRow = {
  renderer: (row) => {
    const { duplicates = [], errors = [], save } = row;

    return (
      <div>
        {!save && (
          <p>
            This record is created/updated earlier.
            Only new accepted name will be assigned.
          </p>
        )}
        {duplicates.length > 0 && (
          <p>
            Duplicate of rows:
            {' '}
            {duplicates.join(', ')}
          </p>
        )}
        {errors.length > 0 && (
          <>
            <p>Errors:</p>
            <ul>
              {errors.map((e, i) => <li key={i}>{e.message}</li>)}
            </ul>
          </>
        )}
      </div>
    );
  },
  showExpandColumn: true,
};

const SpeciesDetailsTableReport = ({ show, data }) => {
  const isHidden = show ? '' : 'hidden';
  return (
    <div className={`scrollable ${isHidden}`}>
      <BootstrapTable
        condensed
        keyField="rowId"
        columns={columns}
        data={data}
        rowClasses={rowClasses}
        expandRow={expandRow}
      />
    </div>
  );
};

export default SpeciesDetailsTableReport;

SpeciesDetailsTableReport.propTypes = {
  show: PropTypes.bool.isRequired,
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
