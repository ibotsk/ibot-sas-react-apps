import React from 'react';

import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';

import Base from './components/segments/Base/Base';
import Home from './components/pages/Home/Home';
import ScientificNames from
  './components/pages/ScientificNames/ScientificNames';
import SlovakNames from './components/pages/SlovakNames/SlovakNames';

import config from './config';

const { routes } = config;

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
      <Base router={Routing} />
    </BrowserRouter>
  );
}

export default App;
