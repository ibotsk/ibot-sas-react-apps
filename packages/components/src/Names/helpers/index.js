import React from 'react';
import { species as speciesUtils } from '@ibot/utils';

const makeFormat = (subject, formatString, key) => {
  switch (formatString) {
    case 'italic':
      return <i key={key}>{subject}</i>;
    default:
      return subject;
  }
};

function listOfSpeciesForComponent(name, formatString, options) {
  const nameArr = speciesUtils.listOfSpeciesFormat(name, options);

  const formattedNameArr = nameArr.map((t, i) => {
    if (t.format === formatString) {
      return makeFormat(t.string, formatString, i);
    }
    return t.string;
  });

  return formattedNameArr
    .reduce((acc, el) => acc.concat(el, ' '), [])
    .slice(0, -1);
}

export default {
  listOfSpeciesForComponent,
};
