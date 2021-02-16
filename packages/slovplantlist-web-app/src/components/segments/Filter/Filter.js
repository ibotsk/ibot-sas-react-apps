import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Typography, Toolbar, Divider,
  List, ListItem, ListItemIcon, ListItemText,
  IconButton, TextField, Collapse, Checkbox,
} from '@material-ui/core';

import {
  Delete as DeleteIcon,
  Search as SearchIcon,
  ExpandLess, ExpandMore,
} from '@material-ui/icons';

import PropTypes from 'prop-types';

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

const ListItemTextField = ({
  id, label, value, onChange,
}) => (
  <ListItem
    dense
  >
    <TextField
      id={id}
      label={label}
      value={value}
      variant="outlined"
      size="small"
      onChange={onChange}
    />
  </ListItem>
);

const ListItemCollapsible = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
};

const ListItemCheckbox = ({
  id, label, checked, onClick,
}) => (
  <ListItem
    role={undefined}
    dense
    button
    onClick={() => onClick(id)}
  >
    <ListItemIcon>
      <Checkbox
        edge="start"
        size="small"
        checked={checked}
        tabIndex={-1}
        disableRipple
        inputProps={{ 'aria-labelledby': `checkbox-list-label-${label}` }}
      />
    </ListItemIcon>
    <ListItemText id={id} primary={label} />
  </ListItem>
);

const Filter = ({ closed, onSearch }) => {
  const classes = useStyles();

  const [genus, setGenus] = useState('');
  const [species, setSpecies] = useState('');
  const [infraspecific, setInfraspecific] = useState('');
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
      genus,
      species,
      infraspecific,
      checkedStatus,
    });
  };

  const handleReset = () => {
    setGenus('');
    setSpecies('');
    setInfraspecific('');
    setCheckedStatus([]);
    // notify parent
    handleSearch();
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
          <ListItemTextField
            id="genus"
            key="genus"
            label="Genus"
            value={genus}
            onChange={(e) => setGenus(e.target.value)}
          />
          <ListItemTextField
            id="species"
            key="species"
            label="Species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          />
          <ListItemTextField
            id="infraspecific"
            key="infraspecific"
            label="Infraspecific"
            value={infraspecific}
            onChange={(e) => setInfraspecific(e.target.value)}
          />
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

export default Filter;

ListItemTextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

ListItemCollapsible.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

ListItemCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

Filter.propTypes = {
  closed: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
};

ListItemCollapsible.defaultProps = {
  children: undefined,
};
