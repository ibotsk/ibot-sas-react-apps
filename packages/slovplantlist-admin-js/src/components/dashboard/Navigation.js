import React from 'react';

import {
  Divider,
  List,
} from '@material-ui/core';
import {
  Dashboard as DashboardIcon,
  ListAlt as ListAltIcon,
} from '@material-ui/icons';

import {
  ListItemLink,
} from '@ibot/components';

const Navigation = () => (
  <List>
    <ListItemLink
      to="/"
      primary="Dashboard"
      icon={<DashboardIcon />}
    />
    <Divider />
    <ListItemLink
      to="/checklist"
      primary="Checklist"
      icon={<ListAltIcon />}
    />
    <ListItemLink
      to="/genera"
      primary="Genera"
      icon={<ListAltIcon />}
    />
    <ListItemLink
      to="/families-apg"
      primary="Families APG"
      icon={<ListAltIcon />}
    />
    <ListItemLink
      to="/families"
      primary="Families"
      icon={<ListAltIcon />}
    />
  </List>
);

export default Navigation;
