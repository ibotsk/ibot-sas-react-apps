/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';

const styles = (theme) => ({
  deleteButton: {
    color: theme.palette.error.dark,
  },
});

const AdminDeleteButton = withStyles(styles)((props) => {
  const {
    onDelete, recordId, classes, ...other
  } = props;

  if (!recordId || !onDelete) {
    return null;
  }

  const handleClickWithAlert = () => {
    const result = window.confirm('Delete record permanently?');
    if (result) {
      onDelete();
    }
  };

  return (
    <Box flexGrow="1">
      <Button
        className={classes.deleteButton}
        onClick={handleClickWithAlert}
        {...other}
      >
        {other.children || 'Delete'}
      </Button>
    </Box>
  );
});

export default AdminDeleteButton;
