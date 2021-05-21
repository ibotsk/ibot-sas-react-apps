import React from 'react';

import { FormControl } from 'react-bootstrap';

import PropTypes from 'prop-types';

const COMPONENT_CLASSES_W_CHILDREN = ['select'];

const FormControlEditableOrStatic = ({
  editable = false, children, ...props
}) => {
  const { value, componentClass } = props;
  const staticVal = COMPONENT_CLASSES_W_CHILDREN.includes(componentClass)
    ? children : value;
  if (!editable) {
    return (
      <FormControl.Static>
        {staticVal}
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
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  componentClass: PropTypes.string,
};
FormControlEditableOrStatic.defaultProps = {
  editable: false,
  children: undefined,
  value: undefined,
  componentClass: undefined,
};
