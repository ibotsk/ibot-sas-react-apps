import React from 'react';

import {
  ListItem, ListItemIcon, ListItemText,
  Checkbox,
} from '@material-ui/core';

import PropTypes from 'prop-types';

const ListItemCheckbox = ({
  id, label, checked, onClick,
}) => (
  <ListItem
    role={undefined}
    dense
    button
    onClick={() => onClick(id)}
  >
    <ListItemIcon>
      <Checkbox
        edge="start"
        size="small"
        checked={checked}
        tabIndex={-1}
        disableRipple
        inputProps={{ 'aria-labelledby': `checkbox-list-label-${label}` }}
      />
    </ListItemIcon>
    <ListItemText id={id} primary={label} />
  </ListItem>
);

export default ListItemCheckbox;

ListItemCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
