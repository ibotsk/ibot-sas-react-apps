import React, { useState } from 'react';

import {
  Button, Panel,
} from 'react-bootstrap';

import PropTypes from 'prop-types';
import SpeciesType from 'components/propTypes/species';

import SpeciesDetailsTableReport from './SpeciesDetailsTableReport';

const ImportReport = ({ data }) => {
  const [isDetailTableShowed, setIsDetailTableShowed] = useState(false);

  const newRecordsCount = data.filter(({ operation }) => (
    operation === 'create'
  )).length;
  const updateRecordsCount = data.filter(({ operation }) => (
    operation === 'update'
  )).length;
  const acceptedNamesCount = data.filter(({ species }) => (
    species.ntype === 'A'
  )).length;
  const synonymsCount = data.filter(({ species }) => (
    species.ntype === 'S'
  )).length;
  const errorsArray = data.filter(({ errors }) => (
    errors && errors.length > 0
  ));

  return (
    <>
      <Panel bsStyle="info">
        <Panel.Heading>
          <Panel.Title toggle>View details</Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          <p>
            New records:
            {' '}
            {newRecordsCount}
          </p>
          <p>
            Records to update:
            {' '}
            {updateRecordsCount}
          </p>
          <p>
            Accepted names:
            {' '}
            {acceptedNamesCount}
          </p>
          <p>
            Synonyms:
            {' '}
            {synonymsCount}
          </p>
          {errorsArray.length > 0 && (
            <p className="text-danger">
              There are errors, please review them by
              clicking &lsquo;More details&rsquo; below
            </p>
          )}
          <Button
            bsStyle="link"
            bsSize="xsmall"
            onClick={() => setIsDetailTableShowed(!isDetailTableShowed)}
          >
            {isDetailTableShowed ? 'Less details <<<' : 'More details >>>'}
          </Button>
          <SpeciesDetailsTableReport
            show={isDetailTableShowed}
            data={data}
          />
        </Panel.Body>
      </Panel>
    </>
  );
};

export default ImportReport;

ImportReport.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    operation: PropTypes.string.isRequired,
    species: SpeciesType.type.isRequired,
  })).isRequired,
};
