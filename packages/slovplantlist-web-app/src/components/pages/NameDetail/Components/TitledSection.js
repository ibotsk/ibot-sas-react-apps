import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  paper: {
    minHeight: 20,
    padding: '10px 0px',
    marginBottom: 15,
  },
}));

const TitledSection = ({ title, children }) => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Typography variant="overline" display="block">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TitledSection;

TitledSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

TitledSection.defaultProps = {
  children: undefined,
};
