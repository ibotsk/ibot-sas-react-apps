/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import clsx from 'clsx';

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

const AdminTextField = ({ readonly = false, className, ...textFieldProps }) => {
  const classes = useStyles();
  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      margin="dense"
      disabled={readonly}
      className={clsx(readonly && classes.readonly, className)}
      {...textFieldProps}
    />
  );
};

export default AdminTextField;

AdminTextField.propTypes = {
  readonly: PropTypes.bool,
  className: PropTypes.string,
};
AdminTextField.defaultProps = {
  readonly: false,
  className: undefined,
};
