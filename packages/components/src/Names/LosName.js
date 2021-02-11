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
  uri = undefined,
}) => {
  if (!data) {
    return null;
  }
  const options = {
    isPublication,
    isTribus,
    isAggregates,
  };
  const los = helper.listOfSpeciesForComponent(data, format, options);

  if (uri) {
    return (
      <a href={uri}>
        {los}
      </a>
    );
  }
  return (
    <span>
      {los}
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
  uri: PropTypes.string,
};

LosName.defaultProps = {
  data: undefined,
  format: 'plain',
  isPublication: false,
  isTribus: false,
  isAggregates: false,
  uri: undefined,
};
