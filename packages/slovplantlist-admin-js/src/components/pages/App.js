import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core';
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core/styles';

import PrivateRoute from 'components/wrappers/PrivateRoute';

import themeSetting from 'config/theme';

import Login from './Login';
import HomePage from './HomePage/HomePage';

const theme = createMuiTheme(themeSetting);

const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute component={HomePage} />
      </Switch>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
