/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';
import { SpeciesType } from '@ibot/types';

import helper from './helpers';

const LosName = ({
  data = undefined,
  format = 'plain',
  authors = true,
  isPublication = false,
  isTribus = false,
  isAggregates = false,
  uri = undefined, // left for backward compatibility
  component: Component = 'span',
  // all these props are passed to component
  ...props
}) => {
  if (!data) {
    return null;
  }
  const options = {
    isAuthors: authors,
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
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Component {...props}>
      {los}
    </Component>
  );
};

export default LosName;

LosName.propTypes = {
  data: SpeciesType.type,
  format: PropTypes.string,
  authors: PropTypes.bool,
  isPublication: PropTypes.bool,
  isTribus: PropTypes.bool,
  isAggregates: PropTypes.bool,
  uri: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

LosName.defaultProps = {
  data: undefined,
  format: 'plain',
  authors: true,
  isPublication: false,
  isTribus: false,
  isAggregates: false,
  uri: undefined,
  component: 'span',
};
