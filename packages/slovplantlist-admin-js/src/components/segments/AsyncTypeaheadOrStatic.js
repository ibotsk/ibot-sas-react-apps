/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { FormControl } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import PropTypes from 'prop-types';

const AsyncTypeaheadOrStatic = ({
  editable = true,
  staticVal = '-',
  ...props
}) => {
  if (!editable) {
    return (
      <FormControl.Static>
        {staticVal}
      </FormControl.Static>
    );
  }
  return (
    <AsyncTypeahead {...props} />
  );
};

export default AsyncTypeaheadOrStatic;

AsyncTypeaheadOrStatic.propTypes = {
  editable: PropTypes.bool,
  staticVal: PropTypes.string,
};
AsyncTypeaheadOrStatic.defaultProps = {
  editable: true,
  staticVal: '-',
};
