import React from 'react';

import PropTypes from 'prop-types';

import { generaUtils } from '@ibot/utils';

const GenusName = ({ data }) => (
  <span>{generaUtils.genusString(data)}</span>
);

export default GenusName;

GenusName.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    authors: PropTypes.string,
  }),
};

GenusName.defaultProps = {
  data: undefined,
};
