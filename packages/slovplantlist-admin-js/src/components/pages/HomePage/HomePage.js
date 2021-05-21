import React from 'react';
import { Switch } from 'react-router-dom';

import Users from 'components/pages/Users/Users';
import Checklist from 'components/pages/Checklist/Checklist';
import ChecklistImport from 'components/pages/Checklist/Import/ChecklistImport';
import Genera from 'components/pages/Genera/Genera';
import FamiliesAPG from 'components/pages/FamiliesAPG/FamiliesAPG';
import Families from 'components/pages/Families/Families';

import PrivateRoute from 'components/wrappers/PrivateRoute';
import Dashboard from 'components/dashboard/Dashboard';

import Logout from './Logout';

const Routing = () => (
  <Switch>
    <PrivateRoute path="/checklist" component={Checklist} />
    <PrivateRoute path="/checklist/import" component={ChecklistImport} />
    <PrivateRoute path="/genera" component={Genera} />
    <PrivateRoute path="/families-apg" component={FamiliesAPG} />
    <PrivateRoute path="/families" component={Families} />
    <PrivateRoute path="/users" component={Users} />
    <PrivateRoute path="/logout" component={Logout} />
  </Switch>
);

const HomePage = () => (
  <Dashboard routing={Routing} />
);

export default HomePage;
