/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core';
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core/styles';

import Base from './components/segments/Base/Base';
import Home from './components/pages/Home/Home';
import ScientificNames from
  './components/pages/ScientificNames/ScientificNames';
import SlovakNames from './components/pages/SlovakNames/SlovakNames';
import NameDetail from './components/pages/NameDetail/NameDetail';

import config from './config';
import themeSetting from './config/theme';

const { routes } = config;

const theme = createMuiTheme(themeSetting);

const Routing = (routingProps) => (
  <Switch>
    <Route exact path={routes.home.route} component={Home} />
    <Route
      exact
      path={routes.scientificNames.route}
      render={() => <ScientificNames {...routingProps} />}
    />
    <Route exact path={routes.slovakNames.route} component={SlovakNames} />
    <Route path={routes.nameDetail.route} component={NameDetail} />
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
