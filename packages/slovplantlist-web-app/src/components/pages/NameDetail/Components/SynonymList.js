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

const useStyles = makeStyles((theme) => ({
  synonymPrefix: {
    minWidth: 'auto',
    marginRight: 15,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const ListItemSynonymPrefix = ({ type }) => {
  const classes = useStyles();

  return (
    <ListItemIcon className={classes.synonymPrefix}>
      {syntypeToPrefix(type)}
    </ListItemIcon>
  );
};

const SynonymListItem = ({ type, name, subsynonyms = [] }) => {
  const classes = useStyles();

  return (
    <>
      <ListItem disableGutters>
        <ListItemSynonymPrefix type={type} />
        <ListItemText primary={name} />
      </ListItem>
      {subsynonyms.length > 0 && (
        <List dense component="div" disablePadding>
          {subsynonyms.map(({ id, name: subsyn }) => (
            <ListItem
              key={id}
              className={classes.nested}
              disableGutters
            >
              <ListItemSynonymPrefix type={3} />
              <ListItemText primary={subsyn} />
            </ListItem>
          ))}
        </List>
      )}
    </>
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

ListItemSynonymPrefix.propTypes = {
  type: PropTypes.number.isRequired,
};
