import React, { useState } from 'react';
import {
  Row, Col,
  Panel, ControlLabel,
} from 'react-bootstrap';

import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { TimestampCheck } from '@ibot/components';
import { format } from '@ibot/utils';

import config from 'config/config';

const {
  constants: {
    labelColumnWidth,
    contentColumnWidth,
  },
} = config;

const SpeciesRecordDetailsCheckPublish = ({
  checkedAt,
  checkedBy,
  isEdit = false,
}) => {
  const [checkedTimestamp, setCheckedTimestamp] = useState(checkedAt);
  const [checkedByState, setCheckedByState] = useState(checkedBy);

  const username = useSelector((state) => state.user.username);

  const handleCheck = () => {
    setCheckedTimestamp(format.timestampISO());
    setCheckedByState(username);
  };

  return (
    <>
      <Panel>
        <Panel.Body>
          <Row>
            <Col componentClass={ControlLabel} sm={labelColumnWidth + 1}>
              Check correctnes
            </Col>
            <Col sm={contentColumnWidth - 1}>
              <TimestampCheck
                editable={isEdit}
                isChecked={!!checkedTimestamp}
                checkedTimestamp={checkedTimestamp}
                checkedBy={checkedByState}
                onCheck={handleCheck}
              />
            </Col>
          </Row>
        </Panel.Body>
      </Panel>
    </>
  );
};

export default SpeciesRecordDetailsCheckPublish;

SpeciesRecordDetailsCheckPublish.propTypes = {
  checkedAt: PropTypes.string,
  checkedBy: PropTypes.string,
  isEdit: PropTypes.bool,
};
SpeciesRecordDetailsCheckPublish.defaultProps = {
  checkedAt: undefined,
  checkedBy: undefined,
  isEdit: false,
};
