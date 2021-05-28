/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  readonly: {
    '& .MuiInputBase-root.Mui-disabled': {
      color: theme.palette.text.primary,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
}));

const AdminTextField = ({ readonly = false, ...textFieldProps }) => {
  const classes = useStyles();
  return (
    <TextField
      {...textFieldProps}
      fullWidth
      variant="outlined"
      size="small"
      margin="dense"
      disabled={readonly}
      className={readonly ? classes.readonly : ''}
    />
  );
};

export default AdminTextField;

AdminTextField.propTypes = {
  readonly: PropTypes.bool,
};
AdminTextField.defaultProps = {
  readonly: false,
};
