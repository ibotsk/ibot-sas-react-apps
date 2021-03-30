import React, { useState } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Box, Typography, Toolbar, Divider,
  List, ListItem, IconButton,
  ClickAwayListener, Tooltip,
} from '@material-ui/core';

import {
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@material-ui/icons';

import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

import config from 'config';

import ListItemCollapsible from './Components/ListItemCollapsible';
import ListItemCheckbox from './Components/ListItemCheckbox';

const { status } = config;

const statusOptions = [status.A, status.S, status.PC, status.TP]
  .map(({ key, i18nKey }) => ({
    key,
    value: i18nKey,
  }));

const useStyles = makeStyles((theme) => ({
  toolbarButtons: {
    marginLeft: 'auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  validationMessage: {
    color: theme.palette.warning.main,
  },
  lastTextField: {
    paddingBottom: 10,
  },
}));

const WarningMessage = withStyles((theme) => ({
  root: {
    color: theme.palette.warning.main,
  },
}))(Typography);

const ValidationMessage = ({ open, onClose }) => {
  if (!open) {
    return null;
  }
  return (
    <ClickAwayListener onClickAway={onClose}>
      <WarningMessage
        variant="body2"
        component="span"
      >
        Please provide a value
        <br />
        or check a Status below
      </WarningMessage>
    </ClickAwayListener>
  );
};

const FilterTemplate = ({
  closed, onSearch, onReset, onValidate, children,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [checkedStatus, setCheckedStatus] = useState([]);
  const [validationMessageOpen, setValidationMessageOpen] = useState(false);

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

  const handleValidate = () => {
    if (!onValidate) {
      return true;
    }
    if (!onValidate()) {
      return !!(checkedStatus.length); // if children fields are invalid, then at least one status must be checked
    }
    return true;
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (handleValidate()) {
      onSearch({
        status: checkedStatus,
      });
    } else {
      setValidationMessageOpen(true);
    }
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
              {t('Search')}
            </Typography>
            <div className={classes.toolbarButtons}>
              <Tooltip
                title={t('tooltips.clear')}
              >
                <IconButton
                  color="secondary"
                  edge="end"
                  variant="outlined"
                  onClick={handleReset}
                  aria-label="Clear search fields"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          </ListItem>
          {children}
          <ListItem dense>
            <div className={classes.toolbarButtons}>
              <IconButton
                type="submit"
                color="secondary"
                edge="end"
                variant="outlined"
                onClick={handleSearch}
                aria-label="Submit search"
              >
                <SearchIcon />
              </IconButton>
              <Box>
                <ValidationMessage
                  open={validationMessageOpen}
                  onClose={() => setValidationMessageOpen(false)}
                />
              </Box>
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
                label={t(value)}
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
  onValidate: PropTypes.func,
  children: PropTypes.node,
};

FilterTemplate.defaultProps = {
  onValidate: undefined,
  children: undefined,
};

ValidationMessage.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
