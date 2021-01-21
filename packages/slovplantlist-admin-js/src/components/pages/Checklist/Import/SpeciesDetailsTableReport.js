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
    text: 'Type',
    formatter: (cell, row) => row.species.ntype,
  },
  {
    dataField: 'syntype',
    text: 'Syn. type',
    formatter: (cell, row) => {
      const { syntype } = row.species;
      const key = synonymBySyntype[syntype];
      if (!key) {
        return syntype;
      }
      return synonymConfig[key].prefix;
    },
  },
  {
    dataField: 'species',
    text: 'Name',
    formatter: (cell) => <LosName data={cell} />,
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
  const { duplicates, errors } = row;
  let classes;

  if (duplicates && duplicates.length > 0) {
    classes = messagesConfig.duplicates;
  }
  // overrides anything else before
  if (errors && errors.length > 0) {
    classes = messagesConfig.errors;
  }
  return classes;
};

const expandRow = {
  renderer: (row) => {
    const { duplicates = [], errors = [] } = row;

    return (
      <div>
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
              {errors.map((e, i) => <li key={i}>{e.reason}</li>)}
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
    species: SpeciesType.type.isRequired,
    duplicates: PropTypes.arrayOf(PropTypes.number).isRequired,
    errors: PropTypes.arrayOf(PropTypes.shape({
      reason: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
};
