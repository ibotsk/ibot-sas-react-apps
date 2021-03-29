import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { matchPath } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import PropTypes from 'prop-types';

import UpperMenu from 'components/segments/Navigation/UpperMenu';
import config from 'config';

import LeftDrawer from './LeftDrawer';
import FilterRouter from './FilterRouter';
import Footer from './Footer';

const { routes } = config;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    minHeight: 'calc(100vh - 100px)',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    '& a:hover': {
      textDecoration: 'underline',
    },
  },
}));

const isDrawerOpened = (route) => {
  const found = Object.keys(routes)
    .find((r) => {
      const match = matchPath(route, routes[r].route);
      return match && match.isExact === true;
    });

  if (!found) {
    return false;
  }
  return routes[found].drawerOpened;
};

const Base = ({ router: Router }) => {
  const { pathname } = useLocation();
  const history = useHistory();

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [searchValues, setSearchValues] = useState({});

  useEffect(() => {
    const isOpen = isDrawerOpened(pathname);
    setOpen(isOpen);
  }, [pathname]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSearch = (values, route) => {
    setSearchValues(values);
    history.push(route);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <UpperMenu drawerOpen={open} onDrawerOpen={handleDrawerOpen} />
      <LeftDrawer
        open={open}
        onDrawerClose={handleDrawerClose}
      >
        <FilterRouter
          pathname={pathname}
          closed={!open}
          onSearch={handleSearch}
        />
      </LeftDrawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Router searchValues={searchValues} />
        </Container>
        <Footer />
      </main>
    </div>
  );
};

export default Base;

Base.propTypes = {
  router: PropTypes.func.isRequired,
};
