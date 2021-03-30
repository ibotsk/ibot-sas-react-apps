import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  AppBar, Toolbar, IconButton, Button,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Search as SearchIcon,
} from '@material-ui/icons';

import { useTranslation } from 'react-i18next';

import clsx from 'clsx';
import PropTypes from 'prop-types';

import config from 'config';
import LangMenu from './LangMenu';

const { routes } = config;

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    marginRight: theme.spacing(3),
    textDecoration: 'none',
  },
  menuButtonGroup: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
  menuButtonHidden: {
    display: 'none',
  },
}));

const UpperMenu = ({ drawerOpen, onDrawerOpen }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={onDrawerOpen}
          className={clsx(classes.menuButton,
            drawerOpen && classes.menuButtonHidden)}
        >
          <SearchIcon />
        </IconButton>
        <Box display="flex" className={classes.menuButtonGroup}>
          <Typography
            component={RouterLink}
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
            to={routes.home.route}
          >
            SlovPlantList
          </Typography>
          <Button
            className={classes.menuButton}
            color="inherit"
            variant="text"
            component={RouterLink}
            to={routes.scientificNames.route}
          >
            {t('Scientific names')}
          </Button>
        </Box>
        <LangMenu />
      </Toolbar>
    </AppBar>
  );
};

export default UpperMenu;

UpperMenu.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  onDrawerOpen: PropTypes.func.isRequired,
};
