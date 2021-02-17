import React, { useState } from 'react';

import {
  List, ListItem, ListItemText, Collapse,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import PropTypes from 'prop-types';

const ListItemCollapsible = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
};

export default ListItemCollapsible;

ListItemCollapsible.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

ListItemCollapsible.defaultProps = {
  children: undefined,
};
