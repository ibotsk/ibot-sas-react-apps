import React from 'react';

import PropTypes from 'prop-types';

import { AdminTextField } from '@ibot/components';

const SpeciesRecordDetailsCategories = ({
  categoriesRecord = {},
  onChangeData,
}) => {
  const {
    origin,
    cultivation,
    invasiveness,
    residenceTime,
    endemism,
    threat,
    protectionCurrent,
    protectionPrepared,
  } = categoriesRecord;

  const handleChangeInput = (e) => (
    onChangeData({ [e.target.id]: e.target.value })
  );

  return (
    <>
      <AdminTextField
        id="origin"
        label="Origin status"
        value={origin || ''}
        onChange={handleChangeInput}
      />
      <AdminTextField
        id="cultivation"
        label="Cultivation"
        value={cultivation || ''}
        onChange={handleChangeInput}
      />
      <AdminTextField
        id="invasiveness"
        label="Invasion status"
        value={invasiveness || ''}
        onChange={handleChangeInput}
      />
      <AdminTextField
        id="residenceTime"
        label="Residence time status"
        value={residenceTime || ''}
        onChange={handleChangeInput}
      />
      <AdminTextField
        id="endemism"
        label="Endemic status"
        value={endemism || ''}
        onChange={handleChangeInput}
      />
      <AdminTextField
        id="threat"
        label="Status of threat"
        value={threat || ''}
        onChange={handleChangeInput}
      />
      <AdminTextField
        id="protectionCurrent"
        label="Status of legislative protection (current)"
        value={protectionCurrent || ''}
        onChange={handleChangeInput}
      />
      <AdminTextField
        id="protectionPrepared"
        label="Status of legislative protection (prepared)"
        value={protectionPrepared || ''}
        onChange={handleChangeInput}
      />
    </>
  );
};

export default SpeciesRecordDetailsCategories;

SpeciesRecordDetailsCategories.propTypes = {
  categoriesRecord: PropTypes.shape({
    origin: PropTypes.string,
    cultivation: PropTypes.string,
    invasiveness: PropTypes.string,
    residenceTime: PropTypes.string,
    endemism: PropTypes.string,
    threat: PropTypes.string,
    protectionCurrent: PropTypes.string,
    protectionPrepared: PropTypes.string,
  }),
  onChangeData: PropTypes.func.isRequired,
};
SpeciesRecordDetailsCategories.defaultProps = {
  categoriesRecord: {},
};
