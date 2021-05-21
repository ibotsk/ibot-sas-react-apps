import React from 'react';

import {
  Divider,
  List,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dashboard as DashboardIcon,
  ListAlt as ListAltIcon,
  GetApp as GetAppIcon,
} from '@material-ui/icons';

import {
  ListItemLink,
} from '@ibot/components';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Navigation = () => {
  const classes = useStyles();
  return (
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
        className={classes.nested}
        to="/checklist/import"
        primary="Import"
        icon={<GetAppIcon />}
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
};

export default Navigation;
