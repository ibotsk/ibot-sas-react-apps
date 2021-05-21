import React from 'react';
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
  checkedTimestamp,
  checkedBy,
  isEdit = false,
  onChangeData,
}) => {
  const username = useSelector((state) => state.user.username);

  const handleCheck = () => (
    onChangeData({
      checkedBy: username,
      checkedTimestamp: format.timestampISO(),
    })
  );

  return (
    <>
      <Panel>
        <Panel.Body>
          <Row>
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Check correctnes
            </Col>
            <Col sm={contentColumnWidth}>
              <TimestampCheck
                editable={isEdit}
                isChecked={!!checkedTimestamp}
                checkedTimestamp={checkedTimestamp}
                checkedBy={checkedBy}
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
  checkedTimestamp: PropTypes.string,
  checkedBy: PropTypes.string,
  isEdit: PropTypes.bool,
  onChangeData: PropTypes.func.isRequired,
};
SpeciesRecordDetailsCheckPublish.defaultProps = {
  checkedTimestamp: undefined,
  checkedBy: undefined,
  isEdit: false,
};
