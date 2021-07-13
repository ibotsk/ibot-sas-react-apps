import React from 'react';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  error: {
    color: theme.palette.error.light,
    borderColor: theme.palette.error.light,
  },
  success: {
    color: theme.palette.success.light,
    borderColor: theme.palette.success.light,
  },
}));

const AdminTimestampCheck = ({
  isChecked, checkedTimestamp, checkedBy, onCheck,
  editable = true,
}) => {
  const classes = useStyles();

  return (
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
      {editable && (
        <Button
          className={checkedTimestamp ? classes.success : classes.error}
          size="small"
          variant="outlined"
          onClick={onCheck}
        >
          {checkedTimestamp ? 'Re-check' : 'Check'}
        </Button>
      )}
    </div>
  );
};

export default AdminTimestampCheck;

AdminTimestampCheck.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  checkedTimestamp: PropTypes.string,
  checkedBy: PropTypes.string,
  onCheck: PropTypes.func.isRequired,
  editable: PropTypes.bool,
};

AdminTimestampCheck.defaultProps = {
  checkedTimestamp: undefined,
  checkedBy: undefined,
  editable: true,
};
