import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  Tabs, Tab, Typography,
} from '@material-ui/core';

import Can from 'components/segments/auth/Can';
import {
  PageTitle, TabPanel,
} from '@ibot/components';

import AllUsers from './Tabs/AllUsers';
import GeneraUsers from './Tabs/GeneraUsers';

const Users = () => {
  const [activeTab, setActiveTab] = useState(0);

  const userRole = useSelector((state) => state.user.role);

  return (
    <Can
      role={userRole}
      perform="users"
      yes={() => (
        <>
          <PageTitle title="Users - Slovplantlist" />
          <Typography variant="h4" component="h1">
            Manage users
          </Typography>
          <Tabs
            id="users-tabs"
            value={activeTab}
            indicatorColor="secondary"
            textColor="secondary"
            onChange={(e, newTab) => setActiveTab(newTab)}
            aria-label="Users tabs"
          >
            <Tab label="All users" />
            <Tab label="Users and genera" />
          </Tabs>
          <TabPanel value={activeTab} index={0}>
            <AllUsers />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <GeneraUsers />
          </TabPanel>
        </>
      )}
      no={() => <Redirect to="/" />}
    />
  );
};

export default Users;
