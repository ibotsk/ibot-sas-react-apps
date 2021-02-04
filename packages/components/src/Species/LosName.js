import React from 'react';

import PropTypes from 'prop-types';
import { SpeciesType } from '@ibot/types';

import helper from './helpers';

const LosName = ({
  data = undefined,
  format = 'plain',
  isPublication = false,
  isTribus = false,
  isAggregates = false,
}) => {
  if (!data) {
    return null;
  }
  const options = {
    isPublication,
    isTribus,
    isAggregates,
  };
  return (
    <span>
      {helper.listOfSpeciesForComponent(data, format, options)}
    </span>
  );
};

export default LosName;

LosName.propTypes = {
  data: SpeciesType.type,
  format: PropTypes.string,
  isPublication: PropTypes.bool,
  isTribus: PropTypes.bool,
  isAggregates: PropTypes.bool,
};

LosName.defaultProps = {
  data: undefined,
  format: 'plain',
  isPublication: false,
  isTribus: false,
  isAggregates: false,
};
