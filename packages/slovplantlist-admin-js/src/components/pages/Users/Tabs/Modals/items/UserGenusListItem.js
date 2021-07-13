import React from 'react';

import {
  ListItemText,
} from '@material-ui/core';

import PropTypes from 'prop-types';

const UserGenusListItem = ({ data: { label } }) => (
  <>
    <ListItemText
      primary={label}
    />
  </>
);

export default UserGenusListItem;

UserGenusListItem.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string,
  }).isRequired,
};
