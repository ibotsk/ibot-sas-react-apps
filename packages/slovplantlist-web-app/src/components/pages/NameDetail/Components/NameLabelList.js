/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { generatePath, Link as RouterLink } from 'react-router-dom';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { LosName } from '@ibot/components';

import LabelValueGrid from 'components/segments/Common/LabelValueGrid';
import config from 'config';

import NameList from './NameList';

const {
  routes: routesConfig,
} = config;

const useStyles = makeStyles(() => ({
  nameList: {
    '& li:first-child': {
      paddingTop: 1,
    },
  },
}));

const NameLabelList = ({ label, listOfNames = [] }) => {
  const classes = useStyles();

  const listOfNamesLos = listOfNames.map((name) => ({
    id: name.id,
    name: (
      <LosName
        data={name}
        format="italic"
        component={RouterLink}
        to={generatePath(routesConfig.nameDetail.route, { id: name.id })}
      />
    ),
  }));

  return (
    <LabelValueGrid
      label={label}
      alignItems="flex-start"
      alignContent="flex-start"
    >
      {listOfNamesLos.length
        ? <NameList list={listOfNamesLos} className={classes.nameList} />
        : '-'
      }
    </LabelValueGrid>
  );
};

export default NameLabelList;

NameLabelList.propTypes = {
  label: PropTypes.string.isRequired,
  listOfNames: PropTypes.arrayOf(PropTypes.object),
};

NameLabelList.defaultProps = {
  listOfNames: [],
};
