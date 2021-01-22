import React from 'react';

import PropTypes from 'prop-types';
import { SpeciesType } from '@ibot/types';

import helper from './helpers';

const LosName = ({ data = undefined, format = 'plain' }) => {
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

LosName.propTypes = {
  data: SpeciesType.type,
  format: PropTypes.string,
};

LosName.defaultProps = {
  data: undefined,
  format: 'plain',
};
