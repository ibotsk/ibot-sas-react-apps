/* eslint-disable no-alert */
import React from 'react';

import {
  Toolbar, Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/DeleteForever';

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
    },
  },
}));

const AdminDeleteToolbar = ({ recordId, onDelete }) => {
  if (!recordId) {
    return null;
  }

  const classes = useStyles();

  const handleClickWithAlert = () => {
    const result = window.confirm('Delete record?');
    if (result) {
      onDelete();
    }
  };

  return (
    <Toolbar
      className={classes.toolbar}
      variant="dense"
      disableGutters
    >
      <Button
        className={classes.deleteButton}
        disableElevation
        variant="contained"
        size="small"
        startIcon={<DeleteIcon />}
        onClick={handleClickWithAlert}
      >
        Delete
      </Button>
    </Toolbar>
  );
};

export default AdminDeleteToolbar;

AdminDeleteToolbar.propTypes = {
  recordId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onDelete: PropTypes.func.isRequired,
};
AdminDeleteToolbar.defaultProps = {
  recordId: undefined,
};
