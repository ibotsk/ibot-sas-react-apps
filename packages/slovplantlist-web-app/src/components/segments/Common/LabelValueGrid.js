import React from 'react';

import PropTypes from 'prop-types';

import { Box, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  label: {
    textAlign: 'right',
  },
}));

const LabelValueGrid = ({
  label,
  children = undefined,
  alignItems = 'center',
  alignContent = 'center',
}) => {
  const classes = useStyles();
  return (
    <Box color="text.secondary">
      <Grid
        container
        alignContent={alignContent}
        alignItems={alignItems}
        spacing={2}
      >
        <Grid item sm={3} className={classes.label}>
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
        <Grid item xs={12} sm={9}>
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

export default LabelValueGrid;

LabelValueGrid.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
  alignItems: PropTypes.string,
  alignContent: PropTypes.string,
};
LabelValueGrid.defaultProps = {
  children: undefined,
  alignItems: 'center',
  alignContent: 'center',
};
