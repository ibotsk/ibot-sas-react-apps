import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Breadcrumbs, Grid, Paper, Typography,
} from '@material-ui/core';

import { LosName } from '@ibot/components';

import PropTypes from 'prop-types';

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

const HigherTaxonChip = ({ label, value }) => (
  <div>
    <Typography component="span" variant="subtitle2">
      {label}
      :
    </Typography>
    {' '}
    <Typography component="span" variant="subtitle1" color="textPrimary">
      {value}
    </Typography>
  </div>
);

const HigherTaxa = ({ genus = '-', familyAPG = '-' }) => (
  <Breadcrumbs
    component="div"
    separator=">"
    aria-label="higher taxa"
  >
    <HigherTaxonChip label="Family" value={familyAPG} />
    <HigherTaxonChip label="Genus" value={genus} />
  </Breadcrumbs>
);

const NameTitleSection = ({
  name, status, publication, genus, familyAPG,
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
            {publication}
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
    </Grid>
  );
};

export default NameTitleSection;

NameTitleSection.propTypes = {
  name: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  publication: PropTypes.string,
  genus: PropTypes.string,
  familyAPG: PropTypes.string,
};

NameTitleSection.defaultProps = {
  publication: undefined,
  genus: undefined,
  familyAPG: undefined,
};

HigherTaxonChip.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

HigherTaxa.propTypes = {
  genus: PropTypes.string,
  familyAPG: PropTypes.string,
};
HigherTaxa.defaultProps = {
  genus: '-',
  familyAPG: '-',
};
