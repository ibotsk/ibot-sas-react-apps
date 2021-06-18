/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import {
  DialogTitle, DialogContent, DialogActions,
  Button, MenuItem, InputAdornment, IconButton,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {
  AdminEditDialog, AdminTextField, DividerSpaced,
} from '@ibot/components';

import { notifications } from 'utils';

import { usersFacade, rolesFacade } from 'facades';

const userInitialValues = {
  id: undefined,
  username: '',
  email: '',
  password: '',
  realm: '',
  emailVerified: false,
  verificationToken: null,
};

const UsersModal = ({ editId: id, show, onHide }) => {
  const [user, setUser] = useState(userInitialValues);
  const [role, setRole] = useState(0);
  const [rolesOptions, setRolesOptions] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const accessToken = useSelector((state) => state.authentication.accessToken);

  useEffect(() => {
    const fetch = async () => {
      const opts = await rolesFacade.getAllRoles(accessToken);
      setRolesOptions(opts);
    };

    fetch();
  }, [accessToken]);

  const handleEnter = useCallback(() => {
    const fetch = async () => {
      if (id) {
        const { user: u, roles } = await usersFacade.getUserById(
          id, accessToken,
        );
        const userRole = roles[0].id;

        setUser(u);
        setRole(userRole);
      }
    };

    fetch();
  }, [id, accessToken]);

  const handleHide = () => {
    setUser(userInitialValues);
    setRole(0);
    onHide();
  };

  const isUserInvalid = () => {
    const { username, password, email } = user;
    const is = !username || username.length === 0
      || !email || email.lenght === 0
      || (!id && (!password || password.length === 0));

    return {
      result: is,
      props: {
        error: is,
        helperText: (is
          ? `Username ${!id ? ', password ' : ''}and e-mail must not be empty`
          : undefined),
      },
    };
  };

  const handleChangeUser = (e) => {
    const { id: prop, value } = e.target;
    setUser({
      ...user,
      [prop]: value,
    });
  };

  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSave = async () => {
    if (!isUserInvalid().result) {
      try {
        const userId = await usersFacade.saveUser(user, accessToken);
        await rolesFacade.saveRoleForUser(userId, role.id, accessToken);
        notifications.success('Saved');
        handleHide();
      } catch (error) {
        notifications.error('Error saving');
        throw error;
      }
    } else {
      notifications.error('All mandatory fields must be filled!');
    }
  };

  const {
    username, email, password,
  } = user;

  return (
    <AdminEditDialog
      open={show}
      onEnter={handleEnter}
      onClose={handleHide}
      aria-labelledby="users-dialog"
    >
      <DialogTitle id="users-dialog-title">
        {id
          ? (
            <>
              {`Edit user - ID ${id} - ${user.username}`}
            </>
          )
          : 'Create new user'}
      </DialogTitle>
      <DialogContent dividers>
        <AdminTextField
          id="username"
          label="Username"
          value={username || ''}
          onChange={handleChangeUser}
          {...(isUserInvalid().props)}
        />
        <AdminTextField
          id="email"
          type="email"
          label="E-Mail"
          value={email || ''}
          onChange={handleChangeUser}
          {...(isUserInvalid().props)}
        />
        <AdminTextField
          select
          id="role"
          name="role"
          label="Role"
          value={role || ''}
          onChange={handleChangeRole}
        >
          {rolesOptions.map((r) => (
            <MenuItem value={r.id} key={r.id}>
              {r.name.toUpperCase()}
            </MenuItem>
          ))}
        </AdminTextField>
        {!id && (
          <>
            <DividerSpaced />
            <AdminTextField
              id="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              value={password || ''}
              onChange={handleChangeUser}
              {...(isUserInvalid().props)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleHide}>
          Close
        </Button>
        <Button color="primary" onClick={handleSave}>
          Save changes
        </Button>
      </DialogActions>
    </AdminEditDialog>
  );
};

export default UsersModal;

UsersModal.propTypes = {
  show: PropTypes.bool.isRequired,
  editId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onHide: PropTypes.func.isRequired,
};

UsersModal.defaultProps = {
  editId: undefined,
};
