import React from 'react';
import helper from './helpers';

const LosName = ({ data, format = 'plain' }) => {
  if (!data) {
    return null;
  }
  return (
    <span>
      {helper.listOfSpeciesForComponent(data, format)}
    </span>
  );
};

export default LosName;
