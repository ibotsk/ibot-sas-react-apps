/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { generatePath, Link as RouterLink } from 'react-router-dom';

import PropTypes from 'prop-types';

import {
  Box, List, ListItem, ListItemText, ListItemIcon,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { LosName } from '@ibot/components';

import config from '../../../../config';

const {
  synonymType,
  synonyms: synonymsConfig,
  routes,
} = config;

const syntypeToPrefix = (type) => {
  const typeKey = synonymType[type];
  return synonymsConfig[typeKey].prefix;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
  },
  synonymPrefix: {
    minWidth: 'auto',
    marginRight: 15,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    paddingTop: 0,
    paddingBottom: 0,
  },
  misidentificationAuthor: {
    display: 'block',
    paddingLeft: theme.spacing(3),
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

const SynonymListItemTemplate = ({
  syntype, name, subsynonyms = [],
  nameAdditions: Additions,
}) => {
  const classes = useStyles();

  return (
    <>
      <ListItem className={classes.root} disableGutters>
        <Box>
          <ListItemSynonymPrefix type={syntype} />
          <LosName
            data={name}
            format="italic"
            component={RouterLink}
            to={generatePath(routes.nameDetail.route, { id: name.id })}
          />
        </Box>
        {Additions && <Additions />}
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

export const SynonymListItemBasic = ({
  syntype, name,
}) => (
  <SynonymListItemTemplate syntype={syntype} name={name} />
);

export const SynonymListItemMisidentification = ({
  syntype, name, misidentificationAuthor,
}) => {
  const classes = useStyles();

  return (
    <SynonymListItemTemplate
      syntype={syntype}
      name={name}
      nameAdditions={() => (
        <ListItemText
          className={classes.misidentificationAuthor}
          secondary={`Misidentified by: ${misidentificationAuthor}`}
        />
      )}
    />
  );
};

SynonymListItemTemplate.propTypes = {
  syntype: PropTypes.number.isRequired,
  name: PropTypes.object,
  subsynonyms: PropTypes.arrayOf(PropTypes.object),
  nameAdditions: PropTypes.func,
};

SynonymListItemTemplate.defaultProps = {
  name: undefined,
  subsynonyms: [],
  nameAdditions: undefined,
};

ListItemSynonymPrefix.propTypes = {
  type: PropTypes.number.isRequired,
};

SynonymListItemBasic.propTypes = {
  syntype: PropTypes.number.isRequired,
  name: PropTypes.object,
};
SynonymListItemBasic.defaultProps = {
  name: undefined,
};

SynonymListItemMisidentification.propTypes = {
  syntype: PropTypes.number.isRequired,
  name: PropTypes.object,
  misidentificationAuthor: PropTypes.string,
};
SynonymListItemMisidentification.defaultProps = {
  name: undefined,
  misidentificationAuthor: undefined,
};
