import React from 'react';

import {
  Panel,
} from 'react-bootstrap';

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
  console.log(data);
  const newRecords = data.filter(({ operation }) => (
    operation === 'create'
  )).length;
  const updateRecords = data.filter(({ operation }) => (
    operation === 'update'
  )).length;
  const acceptedNames = data.filter(({ species }) => (
    species.ntype === 'A'
  )).length;
  const synonyms = data.filter(({ species }) => (
    species.ntype === 'S'
  )).length;

  return (
    <Panel bsStyle="info">
      <Panel.Heading>
        <Panel.Title toggle>View details</Panel.Title>
      </Panel.Heading>
      <Panel.Body collapsible>
        <p>
          New records:
          {' '}
          {newRecords}
        </p>
        <p>
          Records to update:
          {' '}
          {updateRecords}
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
  );
};

export default ImportReport;
