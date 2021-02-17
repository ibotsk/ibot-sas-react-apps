import React from 'react';

import { ListItem, TextField } from '@material-ui/core';

import PropTypes from 'prop-types';

const ListItemTextField = ({
  id, label, value, onChange,
}) => (
  <ListItem
    dense
  >
    <TextField
      id={id}
      label={label}
      value={value}
      variant="outlined"
      size="small"
      onChange={onChange}
    />
  </ListItem>
);

ListItemTextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ListItemTextField;
