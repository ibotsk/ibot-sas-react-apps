/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import { List } from '@material-ui/core';

const SynonymList = ({ syntype, synonyms = [], item: Item }) => {
  if (synonyms.length === 0) {
    return null;
  }
  return (
    <List dense>
      {synonyms.map(({ synonym, misidentificationAuthor, subsynonyms }) => (
        <Item
          key={synonym.id}
          syntype={syntype}
          name={synonym}
          misidentificationAuthor={misidentificationAuthor}
          subsynonyms={subsynonyms}
        />
      ))}
    </List>
  );
};

export default SynonymList;

SynonymList.propTypes = {
  syntype: PropTypes.number.isRequired,
  synonyms: PropTypes.arrayOf(PropTypes.shape({
    synonym: PropTypes.object,
    subsynonyms: PropTypes.arrayOf(PropTypes.object),
  })),
  item: PropTypes.func.isRequired,
};

SynonymList.defaultProps = {
  synonyms: [],
};
