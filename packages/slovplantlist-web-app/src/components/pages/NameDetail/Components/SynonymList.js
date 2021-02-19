import React from 'react';

import {
  List, ListItem, ListItemText, ListItemIcon,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

import config from '../../../../config';

const { synonymType, synonymPrefix } = config;

const syntypeToPrefix = (type) => {
  const typeKey = synonymType[type];
  return synonymPrefix[typeKey].value;
};

const useStyles = makeStyles(() => ({
  synonymPrefix: {
    minWidth: 'auto',
    marginRight: 15,
  },
}));

const SynonymListItem = ({ type, name, subsynonyms = [] }) => {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemIcon className={classes.synonymPrefix}>
        {syntypeToPrefix(type)}
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
};

const SynonymList = ({ synonyms = [] }) => (
  <List dense>
    {synonyms.map(({ syntype, name, subsynonyms }, i) => (
      <SynonymListItem
        key={i}
        type={syntype}
        name={name}
        subsynonyms={subsynonyms}
      />
    ))}
  </List>
);

export default SynonymList;

SynonymList.propTypes = {
  synonyms: PropTypes.arrayOf(PropTypes.shape({
    syntype: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired, // TODO: change this to object or los name
    subsynonyms: PropTypes.arrayOf(PropTypes.object),
  })),
};

SynonymList.defaultProps = {
  synonyms: [],
};

SynonymListItem.propTypes = {
  type: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  subsynonyms: PropTypes.arrayOf(PropTypes.object),
};

SynonymListItem.defaultProps = {
  subsynonyms: [],
};
