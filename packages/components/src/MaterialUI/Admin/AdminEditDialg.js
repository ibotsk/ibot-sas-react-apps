/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Dialog } from '@material-ui/core';

const AdminEditDialog = (props) => (
  <Dialog
    fullWidth
    disableBackdropClick
    disableEscapeKeyDown
    scroll="paper"
    {...props}
  />
);

export default AdminEditDialog;
