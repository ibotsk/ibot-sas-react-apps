import React from 'react';

import {
  Select, FormControl, InputLabel,
} from '@material-ui/core';

import PropTypes from 'prop-types';

const SelectInputFilter = ({
  options, emptyValue = false,
  defaultValue = '',
  defaultIdx = 0,
  ...filterProps
}) => {
  const { item, applyValue } = filterProps;

  const handleFilterChange = (event) => {
    applyValue({ ...item, value: event.target.value });
  };

  const val = item.value || defaultValue || options[defaultIdx].value;

  return (
    <FormControl>
      <InputLabel>Value</InputLabel>
      <Select
        native
        id={item.columnField}
        value={val}
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
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  emptyValue: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultIdx: PropTypes.number,
};
SelectInputFilter.defaultProps = {
  emptyValue: false,
  defaultValue: '',
  defaultIdx: 0,
};
