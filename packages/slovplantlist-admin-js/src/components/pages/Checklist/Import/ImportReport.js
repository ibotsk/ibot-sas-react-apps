import React, { useState } from 'react';

import {
  Accordion, AccordionSummary, AccordionDetails,
  Button, Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

import { LabelValue } from '@ibot/components';

import PropTypes from 'prop-types';
import SpeciesType from 'components/propTypes/species';

import SpeciesDetailsTableReport from './SpeciesDetailsTableReport';

const useStyles = makeStyles(() => ({
  details: {
    flexDirection: 'column',
  },
}));

const ImportReport = ({ data }) => {
  const classes = useStyles();
  const [isDetailTableShowed, setIsDetailTableShowed] = useState(false);

  const newRecordsCount = data.filter(({ operation }) => (
    operation === 'create'
  )).length;
  const updateRecordsCount = data.filter(({ operation }) => (
    operation === 'update'
  )).length;
  const acceptedNamesCount = data.filter(({ record }) => (
    record.ntype === 'A'
  )).length;
  const synonymsCount = data.filter(({ record }) => (
    record.ntype === 'S'
  )).length;
  const errorsArray = data.filter(({ errors }) => (
    errors && errors.length > 0
  ));

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="body1">View details</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <LabelValue label="New records">
          {newRecordsCount}
        </LabelValue>
        <LabelValue label="Records to update">
          {updateRecordsCount}
        </LabelValue>
        <LabelValue label="Accepted names">
          {acceptedNamesCount}
        </LabelValue>
        <LabelValue label="Synonyms">
          {synonymsCount}
        </LabelValue>
        {errorsArray.length > 0 && (
          <Typography color="error">
            There are errors, please review them by clicking
            &lsquo;More details&rsquo; below
          </Typography>
        )}
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => setIsDetailTableShowed(!isDetailTableShowed)}
        >
          {isDetailTableShowed ? 'Less details <<<' : 'More details >>>'}
        </Button>
        {
          isDetailTableShowed && (
            <SpeciesDetailsTableReport
              data={data}
            />
          )
        }
      </AccordionDetails>
    </Accordion>
  );
};

export default ImportReport;

ImportReport.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    operation: PropTypes.string.isRequired,
    record: SpeciesType.type.isRequired,
  })).isRequired,
};
