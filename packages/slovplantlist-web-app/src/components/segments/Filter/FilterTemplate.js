import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Typography, Toolbar, Divider,
  List, ListItem, IconButton,
} from '@material-ui/core';

import {
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@material-ui/icons';

import PropTypes from 'prop-types';

import ListItemCollapsible from './Components/ListItemCollapsible';
import ListItemCheckbox from './Components/ListItemCheckbox';

const statusOptions = [
  {
    key: 'A',
    value: 'Accepted',
  },
  {
    key: 'S',
    value: 'Synonym',
  },
  {
    key: 'PC',
    value: 'Parent combination',
  },
  {
    key: 'TP',
    value: 'Taxon position',
  },
];

const useStyles = makeStyles((/* theme */) => ({
  toolbarButtons: {
    marginLeft: 'auto',
  },
  lastTextField: {
    paddingBottom: 10,
  },
}));

const FilterTemplate = ({
  closed, onSearch, onReset, children,
}) => {
  const classes = useStyles();

  const [checkedStatus, setCheckedStatus] = useState([]);

  const handleCheckStatus = (value) => {
    const currentIndex = checkedStatus.indexOf(value);
    const newChecked = [...checkedStatus];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedStatus(newChecked);
  };

  const handleSearch = () => {
    onSearch({
      status: checkedStatus,
    });
  };

  const handleReset = () => {
    onReset();
    setCheckedStatus([]);
  };

  if (closed) {
    return (
      <Toolbar variant="dense" />
    );
  }

  return (
    <Box className={classes.root}>
      <form noValidate autoComplete="off">
        <List>
          <ListItem>
            <Typography variant="h6" color="secondary">
              Search
            </Typography>
            <div className={classes.toolbarButtons}>
              <IconButton
                color="secondary"
                edge="end"
                variant="outlined"
                onClick={handleReset}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </ListItem>
          {children}
          <ListItem dense>
            <div className={classes.toolbarButtons}>
              <IconButton
                color="secondary"
                edge="end"
                variant="outlined"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </div>
          </ListItem>
        </List>
        <List>
          <Divider />
          <ListItemCollapsible label="Status">
            {statusOptions.map(({ key, value }) => (
              <ListItemCheckbox
                id={key}
                key={key}
                label={value}
                checked={checkedStatus.includes(key)}
                onClick={handleCheckStatus}
              />
            ))}
          </ListItemCollapsible>
          <Divider />
        </List>
      </form>
    </Box>
  );
};

export default FilterTemplate;

FilterTemplate.propTypes = {
  closed: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  children: PropTypes.node,
};

FilterTemplate.defaultProps = {
  children: undefined,
};
