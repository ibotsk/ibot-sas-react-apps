import React from 'react';

import PropTypes from 'prop-types';

import { Box, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  label: {
    textAlign: 'right',
  },
}));

const LabelValue = ({
  label,
  children = undefined,
}) => {
  const classes = useStyles();
  return (
    <Box color="text.secondary">
      <Grid
        container
        alignContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item sm={2} className={classes.label}>
          <Typography
            component="span"
            variant="subtitle2"
            color="textSecondary"
          >
            {label}
            :
            {' '}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Typography
            component="span"
            variant="body2"
            color="textPrimary"
          >
            {children}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LabelValue;

LabelValue.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};
LabelValue.defaultProps = {
  children: undefined,
};
