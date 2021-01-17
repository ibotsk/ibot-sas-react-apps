import React from 'react';
import { connect } from 'react-redux';
import {
  Nav, Navbar, NavDropdown, NavItem, MenuItem, Glyphicon,
} from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

import LoggedUser from 'components/propTypes/loggedUser';

import Can from 'components/segments/auth/Can';

const CNavbar = ({ user }) => (
  <div id="navigation">
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          SlovPlantList Admin
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavDropdown
            eventKey={1}
            title="Checklist"
            id="checklist-nav-dropdown"
          >
            <LinkContainer exact to="/checklist">
              <MenuItem eventKey={1.1}>All data</MenuItem>
            </LinkContainer>
            <LinkContainer exact to="/checklist/import">
              <MenuItem eventKey={1.2}>Import</MenuItem>
            </LinkContainer>
          </NavDropdown>
          <NavItem eventKey={2} href="/genera">
            Genera
          </NavItem>
          <NavItem eventKey={3} href="/families-apg">
            Families APG4
          </NavItem>
          <NavItem eventKey={4} href="/families">
            Families
          </NavItem>
        </Nav>
        <Nav pullRight>
          <Can
            role={user.role}
            perform="users"
            yes={() => (
              <NavItem eventKey={1} href="/users">
                Users
              </NavItem>
            )}
          />
          <LinkContainer to="/logout">
            <NavItem eventKey={2}>
              <Glyphicon glyph="log-out" />
              {' '}
              Logout
            </NavItem>
          </LinkContainer>
        </Nav>
        <Navbar.Text pullRight style={{ marginRight: '15px' }}>
          Logged as:
          {' '}
          <strong>{user.role.toUpperCase()}</strong>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(CNavbar);

CNavbar.propTypes = {
  user: LoggedUser.type.isRequired,
};
