import React from 'react';

import { FormControl } from 'react-bootstrap';

import PropTypes from 'prop-types';

const FormControlEditableOrStatic = ({
  editable = false, children, ...props
}) => {
  if (!editable) {
    return (
      <FormControl.Static>
        {children}
      </FormControl.Static>
    );
  }
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormControl {...props}>
      {children}
    </FormControl>
  );
};

export default FormControlEditableOrStatic;

FormControlEditableOrStatic.propTypes = {
  editable: PropTypes.bool,
  children: PropTypes.node,
};
FormControlEditableOrStatic.defaultProps = {
  editable: false,
  children: undefined,
};
