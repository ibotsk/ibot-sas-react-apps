/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import {
  List, ListItem,
} from '@material-ui/core';

const NameList = ({ list = [] }) => (
  <List dense>
    {list.map(({ id, name }) => (
      <ListItem key={id} disableGutters>
        {name}
      </ListItem>
    ))}
  </List>
);

export default NameList;

NameList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({ // TODO: change to los name
    id: PropTypes.number.isRequired,
    name: PropTypes.object.isRequired,
  })),
};

NameList.defaultProps = {
  list: [],
};
