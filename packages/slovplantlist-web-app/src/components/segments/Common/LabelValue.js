import React from 'react';

import PropTypes from 'prop-types';

import { Box, Typography } from '@material-ui/core';

const LabelValue = ({
  label,
  children = undefined,
}) => (
  <Box color="text.secondary">
    <Typography
      className="label"
      component="span"
      variant="subtitle2"
      color="textSecondary"
    >
      {label}
      :
      {' '}
    </Typography>
    <Typography
      component="span"
      variant="subtitle1"
      color="textPrimary"
    >
      {children}
    </Typography>
  </Box>
);

export default LabelValue;

LabelValue.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};
LabelValue.defaultProps = {
  children: undefined,
};
