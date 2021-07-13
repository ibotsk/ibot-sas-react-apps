import React from 'react';

import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  ListItem, ListItemText, ListItemIcon,
} from '@material-ui/core';

const ListItemLink = ({
  className, icon, primary, to,
}) => {
  const { isExact = false } = useRouteMatch({ path: to, strict: true }) || {};

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <RouterLink to={to} ref={ref} {...itemProps} />
    )),
    [to],
  );

  return (
    <li>
      <ListItem
        selected={isExact}
        button
        component={renderLink}
        className={className}
      >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

export default ListItemLink;

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
};
ListItemLink.defaultProps = {
  icon: undefined,
  className: undefined,
};
