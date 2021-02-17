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
  const [otherOptions, setOtherOptions] = useState([]);

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
  const handleCheckOtherOptions = (value) => {
    const currentIndex = otherOptions.indexOf(value);
    const newChecked = [...otherOptions];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setOtherOptions(newChecked);
  };

  const handleSearch = () => {
    onSearch({
      checkedStatus,
      otherOptions,
    });
  };

  const handleReset = () => {
    onReset();
    setCheckedStatus([]);
    setOtherOptions([]);
  };

  if (closed) {
    return (
      <Toolbar variant="dense">
        <SearchIcon />
      </Toolbar>
    );
  }

  return (
    <Box className={classes.root}>
      <form noValidate autoComplete="off">
        <List>
          <ListItem>
            <Typography variant="h6" color="primary">
              Search
            </Typography>
            <div className={classes.toolbarButtons}>
              <IconButton
                color="primary"
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
                color="primary"
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
          <ListItemCollapsible label="Some other options">
            <ListItemCheckbox
              id="1"
              key="1"
              label="Option 1"
              checked={otherOptions.includes('1')}
              onClick={handleCheckOtherOptions}
            />
            <ListItemCheckbox
              id="2"
              key="2"
              label="Option 2"
              checked={otherOptions.includes('2')}
              onClick={handleCheckOtherOptions}
            />
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
