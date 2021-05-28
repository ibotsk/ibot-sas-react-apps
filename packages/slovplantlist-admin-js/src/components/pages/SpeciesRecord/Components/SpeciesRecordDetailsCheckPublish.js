import React from 'react';

import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { AdminTimestampCheck, TitledSection } from '@ibot/components';
import { format } from '@ibot/utils';

const SpeciesRecordDetailsCheckPublish = ({
  checkedTimestamp,
  checkedBy,
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
      <TitledSection title="Check correctness" variant="outlined">
        <AdminTimestampCheck
          isChecked={!!checkedTimestamp}
          checkedTimestamp={checkedTimestamp}
          checkedBy={checkedBy}
          onCheck={handleCheck}
        />
      </TitledSection>
    </>
  );
};

export default SpeciesRecordDetailsCheckPublish;

SpeciesRecordDetailsCheckPublish.propTypes = {
  checkedTimestamp: PropTypes.string,
  checkedBy: PropTypes.string,
  onChangeData: PropTypes.func.isRequired,
};
SpeciesRecordDetailsCheckPublish.defaultProps = {
  checkedTimestamp: undefined,
  checkedBy: undefined,
};
