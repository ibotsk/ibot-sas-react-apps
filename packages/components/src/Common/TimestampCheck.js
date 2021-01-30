import React from 'react';
import { Button } from 'react-bootstrap';

import PropTypes from 'prop-types';

const TimestampCheck = ({
  isChecked, checkedTimestamp, checkedBy, onCheck,
}) => (
  <div>
    {
      isChecked && (
        <div>
          <div>
            Checked by:
            {' '}
            {checkedBy}
          </div>
          <div>
            Checked at:
            {' '}
            {new Date(Date.parse(checkedTimestamp)).toUTCString()}
          </div>
        </div>
      )
    }
    <Button
      bsStyle={checkedTimestamp ? 'success' : 'danger'}
      bsSize="small"
      onClick={onCheck}
    >
      {checkedTimestamp ? 'Re-check' : 'Check'}
    </Button>
  </div>
);

export default TimestampCheck;

TimestampCheck.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  checkedTimestamp: PropTypes.string,
  checkedBy: PropTypes.string,
  onCheck: PropTypes.func.isRequired,
};

TimestampCheck.defaultProps = {
  checkedTimestamp: undefined,
  checkedBy: undefined,
};
