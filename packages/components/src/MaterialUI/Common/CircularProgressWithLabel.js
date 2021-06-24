/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const CircularProgressWithLabel = ({ label, ...props }) => (
  <Box position="relative" display="inline-flex">
    <CircularProgress variant="determinate" {...props} />
    <Box
      top={0}
      left={0}
      bottom={0}
      right={0}
      position="absolute"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="caption" component="div" color="textSecondary">
        {label}
      </Typography>
    </Box>
  </Box>
);

export default CircularProgressWithLabel;

CircularProgressWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
};
