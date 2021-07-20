/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { DialogTitle, IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const AdminDialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onClose, ...other
  } = props;

  return (
    <DialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          title="Close this window"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
});

export default AdminDialogTitle;
