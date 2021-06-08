import React from 'react';

import {
  Select, FormControl, InputLabel,
} from '@material-ui/core';

import PropTypes from 'prop-types';

const SelectInputFilter = ({ options, emptyValue = false, ...filterProps }) => {
  const { item, applyValue } = filterProps;

  const handleFilterChange = (event) => {
    applyValue({ ...item, value: event.target.value });
  };

  return (
    <FormControl>
      <InputLabel>Value</InputLabel>
      <Select
        native
        id={item.columnField}
        value={item.value || ''}
        onChange={handleFilterChange}
      >
        {emptyValue && (
          <option aria-label="None" value="" />
        )}
        {options.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInputFilter;

SelectInputFilter.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
  emptyValue: PropTypes.bool,
};
SelectInputFilter.defaultProps = {
  emptyValue: false,
};
