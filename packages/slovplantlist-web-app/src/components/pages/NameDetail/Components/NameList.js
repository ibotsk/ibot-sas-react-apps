import React from 'react';

import PropTypes from 'prop-types';

import {
  List, ListItem, ListItemText,
} from '@material-ui/core';

const NameList = ({ list = [] }) => (
  <List dense>
    {list.map(({ id, name }) => (
      <ListItem key={id} disableGutters>
        <ListItemText
          primary={name}
        />
      </ListItem>
    ))}
  </List>
);

export default NameList;

NameList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({ // TODO: change to los name
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
};

NameList.defaultProps = {
  list: [],
};
