/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import TextField from '@material-ui/core/TextField';

const AdminTextField = (textFieldProps) => (
  <TextField
    {...textFieldProps}
    fullWidth
    variant="outlined"
    size="small"
    margin="dense"
  />
);

export default AdminTextField;
