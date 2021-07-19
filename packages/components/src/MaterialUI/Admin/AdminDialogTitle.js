/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { DialogTitle, IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/DeleteForever';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  deleteButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.error.dark,
  },
});

const AdminDialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onDelete, recordId, ...other
  } = props;

  const handleClickWithAlert = () => {
    const result = window.confirm('Delete record?');
    if (result) {
      onDelete();
    }
  };

  return (
    <DialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onDelete && recordId ? (
        <IconButton
          aria-label="delete"
          className={classes.deleteButton}
          title="Delete this record"
          onClick={handleClickWithAlert}
        >
          <DeleteIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
});

export default AdminDialogTitle;
