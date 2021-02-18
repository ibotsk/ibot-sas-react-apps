import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Grid, Paper, Typography,
} from '@material-ui/core';

import { LosName } from '@ibot/components';

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    width: '100%',
    marginTop: -32,
    marginBottom: 30,
  },
  titlePaper: {
    height: 200,
    paddingTop: 40,
    padding: 20,
    textAlign: 'center',
  },
}));

const NameTitleSection = ({ name, status, publication }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      justify="center"
      alignItems="flex-start"
      className={classes.titleContainer}
    >
      <Grid item xs={12}>
        <Paper
          square
          elevation={0}
          variant="outlined"
          className={classes.titlePaper}
        >
          <Typography variant="button" display="block" gutterBottom>
            {status}
          </Typography>
          <Typography variant="h4" component="h1" display="block" gutterBottom>
            <LosName data={name} format="italic" />
          </Typography>
          <Typography variant="body2" display="block">
            <Box color="text.secondary" component="span">
              Published in:
            </Box>
            {' '}
            {publication}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NameTitleSection;
