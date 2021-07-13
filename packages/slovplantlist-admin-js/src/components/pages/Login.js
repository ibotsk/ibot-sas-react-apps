import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Redirect } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {
  setAuthenticated as setAuthenticatedAction,
  unsetAuthenticated as unsetAuthenticatedAction,
  setUser as setUserAction,
  unsetUser as unsetUserAction,
} from 'context/actions';

import { usersFacade } from 'facades';
import config from 'config/config';
import { useLocation } from 'react-router';

const { mappings: { userRole: userRoleConfig } } = config;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToReferrer, setRedirectToReferer] = useState(false);

  const dispatch = useDispatch();
  const {
    state: locationState = {
      from: { pathname: '/' },
    },
  } = useLocation();

  useEffect(() => {
    dispatch(unsetAuthenticatedAction());
    dispatch(unsetUserAction());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // stop here if form is invalid
    if (!(username && password)) {
      return;
    }
    // call login endpoint
    const {
      id: accessToken,
      userId,
    } = await usersFacade.login(username, password);
    if (!accessToken) {
      return;
    }
    const { roles } = await usersFacade.getUserById(userId, accessToken);
    const userGeneraIds = await usersFacade.getGeneraOfUser(
      userId, accessToken, (g) => g.id,
    );

    const userRole = roles[0]
      ? roles[0].name
      : userRoleConfig.author.name;

    dispatch(setAuthenticatedAction(accessToken));
    dispatch(setUserAction(userId, userRole, userGeneraIds, username));
    setRedirectToReferer(true);
  };

  const { from } = locationState;
  if (redirectToReferrer === true) {
    return <Redirect to={from} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          SlovPlantList Admin
        </Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="username"
            autoComplete="off"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
