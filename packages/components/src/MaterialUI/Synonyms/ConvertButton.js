/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
  Button,
} from '@material-ui/core';
import { Reply } from '@material-ui/icons';
import { styled, makeStyles } from '@material-ui/core/styles';

const MakeIntoIcon = styled(Reply)({
  transform: 'scaleX(-1)',
});

const useStyles = makeStyles(() => ({
  button: {
    marginLeft: '2px',
    marginRight: '2px',
    '& .MuiButton-startIcon': {
      marginRight: 0,
    },
  },
}));

const ConvertButton = ({ ...props }) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      disableElevation
      variant="outlined"
      color="primary"
      size="small"
      startIcon={<MakeIntoIcon />}
      {...props}
    />
  );
};

export default ConvertButton;
