import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: 20,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginBottom: 15,
  },
}));

const TitledSection = ({
  title, children, showWhen = true, hideWhen = false,
}) => {
  const classes = useStyles();

  // hideWhen overrides showWhen
  if (!showWhen || hideWhen) {
    return null;
  }

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
  showWhen: PropTypes.bool,
  hideWhen: PropTypes.bool,
};

TitledSection.defaultProps = {
  children: undefined,
  showWhen: true,
  hideWhen: false,
};
