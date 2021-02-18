import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: 200,
    padding: '10px 15px',
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
