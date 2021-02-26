import React from 'react';

import PropTypes from 'prop-types';

import { generaUtils } from '@ibot/utils';

const GenusName = ({ data, isAuthors = true }) => (
  <span>{generaUtils.genusString(data, isAuthors)}</span>
);

export default GenusName;

GenusName.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    authors: PropTypes.string,
  }),
  isAuthors: PropTypes.bool,
};

GenusName.defaultProps = {
  data: undefined,
  isAuthors: true,
};
