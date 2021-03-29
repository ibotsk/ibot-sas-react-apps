import React from 'react';
import { Box, Typography, Link } from '@material-ui/core';

import PropTypes from 'prop-types';

const Copyright = ({ color = 'inherit' }) => (
  <Typography variant="body2" component="div" color={color} align="center">
    <Box p={2} marginBottom={3} fontSize={12}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        https://slovplantlist.sav.sk
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Box>
  </Typography>
);

export default Copyright;

Copyright.propTypes = {
  color: PropTypes.string,
};
Copyright.defaultProps = {
  color: 'inherit',
};
