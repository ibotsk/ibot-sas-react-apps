/* eslint-disable react/forbid-prop-types */
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Breadcrumbs, Grid, Paper, Typography,
} from '@material-ui/core';

import { GenusName, LosName } from '@ibot/components';

import PropTypes from 'prop-types';
import LabelValue from 'components/segments/Common/LabelValue';

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    width: '100%',
    marginTop: -32,
    marginBottom: 30,
  },
  titleItem: {
    padding: theme.spacing(2),
  },
  titlePaper: {
    paddingTop: 40,
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  higherTaxaPaper: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
}));

const HigherTaxa = ({ genus, familyAPG }) => (
  <Breadcrumbs
    component="div"
    separator=">"
    aria-label="higher taxa"
  >
    <LabelValue label="Family">
      {familyAPG ? familyAPG.name : '-'}
    </LabelValue>
    <LabelValue label="Genus">
      <GenusName data={genus} />
    </LabelValue>
  </Breadcrumbs>
);

const NameTitleSection = ({
  name, status, publication = '-', genus, familyAPG, vernacular,
}) => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={1}
      justify="center"
      alignItems="center"
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
          <Typography variant="body2" display="block" gutterBottom>
            <Box color="text.secondary" component="span">
              Published in:
            </Box>
            {' '}
            {publication || '-'}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper
          elevation={0}
          variant="outlined"
          className={classes.higherTaxaPaper}
        >
          <HigherTaxa genus={genus} familyAPG={familyAPG} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper
          elevation={0}
          variant="outlined"
          className={classes.higherTaxaPaper}
        >
          <LabelValue label="Slovak name">{vernacular || '-'}</LabelValue>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NameTitleSection;

NameTitleSection.propTypes = {
  name: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  publication: PropTypes.string,
  genus: PropTypes.object,
  familyAPG: PropTypes.object,
  vernacular: PropTypes.string,
};

NameTitleSection.defaultProps = {
  publication: '-',
  genus: undefined,
  familyAPG: undefined,
  vernacular: '-',
};

HigherTaxa.propTypes = {
  genus: PropTypes.object,
  familyAPG: PropTypes.object,
};
HigherTaxa.defaultProps = {
  genus: undefined,
  familyAPG: undefined,
};
