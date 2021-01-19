import React, { useState } from 'react';

import {
  Button, Panel, Modal,
} from 'react-bootstrap';

import PropTypes from 'prop-types';
import SpeciesType from 'components/propTypes/species';

import { LosName } from '@ibot/components';

const TITLE_NEW_RECORDS = 'New records';
const TITLE_UPDATED_RECORDS = 'Records to update';

const SpeciesDetailsReportModal = ({ title, data, show, onHide }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>
        {title}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {data.map((species, i) => (
        <p key={species.id ? `upd${species.id}` : `cre${i}`}>
          <LosName data={species} />
        </p>
      ))}
    </Modal.Body>
  </Modal>
);

const ErrorsReport = ({ data }) => {
  const errorsArray = data.filter(({ errors }) => (
    errors && errors.length > 0
  ));
  return (
    <Panel bsStyle="danger">
      <Panel.Heading>
        <Panel.Title toggle>Errors</Panel.Title>
      </Panel.Heading>
      <Panel.Body collapsible>
        <ul>
          {errorsArray.map(({ rowId, errors }) => (
            <li key={rowId}>
              Row
              {' '}
              <b>{rowId}</b>
              :
              <ul>
                {errors.map(({ reason }, i) => <li key={i}>{reason}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </Panel.Body>
    </Panel>
  );
};

const ImportReport = ({ data }) => {
  const [isDetailModalShowed, setIsDetailModalShowed] = useState(false);
  const [detailModalTitle, setDetailModalTitle] = useState('');
  const [detailModalData, setDetailModalData] = useState([]);

  const handleShowDetailsModal = (title, data) => {
    const speciesData = data.map(({ species }) => species);
    setDetailModalData(speciesData);
    setDetailModalTitle(title);
    setIsDetailModalShowed(true);
  };

  const newRecords = data.filter(({ operation }) => (
    operation === 'create'
  ));
  const updateRecords = data.filter(({ operation }) => (
    operation === 'update'
  ));
  const acceptedNames = data.filter(({ species }) => (
    species.ntype === 'A'
  )).length;
  const synonyms = data.filter(({ species }) => (
    species.ntype === 'S'
  )).length;

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
            {newRecords.length}
            {' '}
            <Button
              bsStyle="link"
              bsSize="xsmall"
              onClick={() => handleShowDetailsModal(
                TITLE_NEW_RECORDS, newRecords,
              )}
            >
              Details {'>>'}
            </Button>
          </p>
          <p>
            Records to update:
            {' '}
            {updateRecords.length}
            {' '}
            <Button
              bsStyle="link"
              bsSize="xsmall"
              onClick={() => handleShowDetailsModal(
                TITLE_UPDATED_RECORDS, updateRecords,
              )}
            >
              Details {'>>'}
            </Button>
          </p>
          <p>
            Accepted names:
            {' '}
            {acceptedNames}
          </p>
          <p>
            Synonyms:
            {' '}
            {synonyms}
          </p>
          <ErrorsReport data={data} />
        </Panel.Body>
      </Panel>
      <SpeciesDetailsReportModal
        show={isDetailModalShowed}
        data={detailModalData}
        title={detailModalTitle}
        onHide={() => setIsDetailModalShowed(false)}
      />
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

ErrorsReport.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    rowId: PropTypes.number.isRequired,
    errors: PropTypes.arrayOf(PropTypes.shape({
      reason: PropTypes.string.isRequired,
    })),
  })).isRequired,
};
