import React from 'react';

import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

import Base from './components/segments/Base/Base';
import Home from './components/pages/Home/Home';
import ScientificNames from
  './components/pages/ScientificNames/ScientificNames';
import SlovakNames from './components/pages/SlovakNames/SlovakNames';

import config from './config';
import themeSetting from './config/theme';

const { routes } = config;

const theme = createMuiTheme(themeSetting);

const Routing = () => (
  <Switch>
    <Route exact path={routes.home.route} component={Home} />
    <Route
      exact
      path={routes.scientificNames.route}
      component={ScientificNames}
    />
    <Route exact path={routes.slovakNames.route} component={SlovakNames} />
  </Switch>
);

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Base router={Routing} />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
