/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Route,
  Redirect,
} from 'react-router-dom';

import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => (
    !!state.authentication.isAuthenticated
  ));
  return (
    <Route
      {...rest}
      render={(props) => (
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      )}
    />
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  // eslint-disable-next-line react/require-default-props
  component: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.object]),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};
PrivateRoute.defaultProps = {
  location: {},
};
