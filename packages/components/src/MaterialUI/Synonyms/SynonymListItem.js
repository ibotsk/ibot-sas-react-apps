/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
  List, ListItem, ListItemText, ListItemSecondaryAction,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { SpeciesType } from '@ibot/types';

const useStyles = makeStyles(() => ({
  listItemRoot: {
    minWidth: '190px',
  },
  listItemText: {
    minHeight: '28px',
    display: 'flex',
    alignItems: 'center',
  },
  nestedList: {
    marginTop: '-4px',
  },
  nestedListItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  nestedListText: {
    '& .MuiTypography-root': {
      fontSize: 'smaller',
    },
  },
}));

const ItemContent = ({ prefix, children, ...props }) => (
  <Box {...props}>
    {prefix ? `${prefix} ` : ''}
    {children}
  </Box>
);

const SubnomenclatoricList = ({
  data = [], nameComponent: NameComponent,
}) => {
  const classes = useStyles();
  if (data.length === 0) {
    return null;
  }
  return (
    <List
      disablePadding
      dense
      className={classes.nestedList}
    >
      {
        data.map((d) => (
          <ListItem key={d.id} className={classes.nestedListItem}>
            <ListItemText
              className={classes.nestedListText}
              primary={(
                <ItemContent prefix="≡">
                  <NameComponent data={d} />
                </ItemContent>
              )}
            />
          </ListItem>
        ))
      }
    </List>
  );
};

const SynonymListItem = ({
  data,
  prefix,
  additions: Additions,
  nameComponent: NameComponent,
  showSubNomenclatoric = false,
  children,
}) => {
  const classes = useStyles();
  const { synonym: subject } = data;
  const { 'synonyms-nomenclatoric-through': subnomenData } = subject;
  return (
    <div className={classes.listItemRoot}>
      <ListItemText
        className={classes.listItemText}
        primary={(
          <ItemContent prefix={prefix}>
            <NameComponent data={subject} />
          </ItemContent>
        )}
      />
      <ListItemSecondaryAction>
        {Additions && <Additions />}
      </ListItemSecondaryAction>
      {children}
      {
        showSubNomenclatoric && (
          <SubnomenclatoricList
            data={subnomenData}
            nameComponent={NameComponent}
          />
        )
      }
    </div>
  );
};

export default SynonymListItem;

SynonymListItem.propTypes = {
  data: PropTypes.shape({
    synonym: SpeciesType.isRequired,
  }).isRequired,
  nameComponent: PropTypes.func.isRequired,
  prefix: PropTypes.string.isRequired,
  additions: PropTypes.func,
  showSubNomenclatoric: PropTypes.bool,
  children: PropTypes.element,
};
SynonymListItem.defaultProps = {
  additions: undefined,
  showSubNomenclatoric: false,
  children: undefined,
};

ItemContent.propTypes = {
  prefix: PropTypes.string,
  children: PropTypes.element,
};
ItemContent.defaultProps = {
  prefix: undefined,
  children: undefined,
};
SubnomenclatoricList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    'synonyms-nomenclatoric-through': SpeciesType.type,
  })),
  nameComponent: PropTypes.func.isRequired,
};
SubnomenclatoricList.defaultProps = {
  data: [],
};
