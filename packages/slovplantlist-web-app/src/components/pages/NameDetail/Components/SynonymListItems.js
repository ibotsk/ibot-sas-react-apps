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
    paddingLeft: theme.spacing(3),
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
  className,
  syntype,
  name,
  nameAdditions: Additions,
  neighborAdditions: NeighborAdditions,
}) => (
  <>
    <ListItem className={className} disableGutters>
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
    {NeighborAdditions && <NeighborAdditions />}
  </>
);

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
      className={classes.root}
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

export const SynonymListItemTaxonomic = ({
  syntype, name, subsynonyms = [],
}) => {
  const classes = useStyles();
  return (
    <SynonymListItemTemplate
      syntype={syntype}
      name={name}
      neighborAdditions={() => (
        <>
          {subsynonyms.length > 0 && (
            <List dense component="div" disablePadding>
              {subsynonyms.map((subsynonym) => (
                <SynonymListItemTemplate
                  key={subsynonym.id}
                  className={classes.nested}
                  name={subsynonym}
                  syntype={synonymsConfig.nomenclatoric.syntype}
                />
              ))}
            </List>
          )}
        </>
      )}
    />
  );
};

SynonymListItemTemplate.propTypes = {
  className: PropTypes.string,
  syntype: PropTypes.number.isRequired,
  name: PropTypes.object,
  nameAdditions: PropTypes.func,
  neighborAdditions: PropTypes.func,
};

SynonymListItemTemplate.defaultProps = {
  className: undefined,
  name: undefined,
  nameAdditions: undefined,
  neighborAdditions: undefined,
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

SynonymListItemTaxonomic.propTypes = {
  syntype: PropTypes.number.isRequired,
  name: PropTypes.object,
  subsynonyms: PropTypes.arrayOf(PropTypes.object),
};
SynonymListItemTaxonomic.defaultProps = {
  name: undefined,
  subsynonyms: [],
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
