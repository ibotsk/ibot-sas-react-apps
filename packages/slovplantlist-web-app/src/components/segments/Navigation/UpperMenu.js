import React from 'react';
import {
  Box,
  AppBar, Toolbar, IconButton, Button,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from '@material-ui/icons';

import clsx from 'clsx';
import PropTypes from 'prop-types';

import config from '../../../config';

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
    marginRight: 20,
  },
  menuButtonGroup: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 20,
  },
  menuButtonHidden: {
    display: 'none',
  },
}));

const UpperMenu = ({ drawerOpen, onDrawerOpen }) => {
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
          <KeyboardArrowRightIcon />
        </IconButton>
        <Box display="flex" className={classes.menuButtonGroup}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            SlovPlantList
          </Typography>
          <Button
            className={classes.menuButton}
            color="inherit"
            variant="text"
            href={routes.scientificNames.route}
          >
            Scientific names
          </Button>
          <Button
            className={classes.menuButton}
            color="inherit"
            variant="text"
            href={routes.slovakNames.route}
          >
            Slovak names
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default UpperMenu;

UpperMenu.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  onDrawerOpen: PropTypes.func.isRequired,
};
