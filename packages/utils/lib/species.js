import isEqual from 'lodash.isequal';
import pick from 'lodash.pick';

import { italic, plain } from './common';
import config from '../config';

const {
  species: {
    name: configName,
    parts: configNameParts,
  },
} = config;
const {
  aggregates: { wrapL, wrapR },
} = configName;

const makeSl = (string) => {
  const { sl } = configName;
  if (string && string.includes(sl)) {
    const modString = string.replace(sl, '');
    return { s: modString, hasSl: true };
  }
  return { s: string, hasSl: false };
};

/*
    For every property in config.species.name.infra

    Names of the infra taxa must match the ones of the listOfSpecies table columns.
    Notho- are not used.
*/
const infraTaxa = (nomenclature) => {
  let infs = [];

  const configInfraTaxa = configName.infra;

  for (const infra of Object.keys(configInfraTaxa)) {
    const infraValue = nomenclature[infra];

    if (infraValue) {
      const infraLabel = configInfraTaxa[infra];
      infs.push(plain(infraLabel));
      infs.push(italic(infraValue));
    }
  }

  return infs;
};

const invalidDesignation = (name, syntype) => {
  if (syntype === '1') {
    let newname = [];
    newname.push(Plain('"'));
    newname = newname.concat(name);
    newname.push(Plain('"'));
    return newname;
  }
  return name;
};

function listOfSpeciesFormat(nomenclature, options = {}) {
  const opts = {
    isPublication: false,
    isTribus: false,
    isAggregates: false,
    ...options,
  };
  const {
    species, genus,
    subsp, var: varieta, forma,
    authors, publication, tribus,
    aggregate, subaggregate,
  } = nomenclature;

  let isAuthorLast = true;

  let name = [];
  const slResult = makeSl(species);

  name.push(italic(genus));
  name.push(italic(slResult.s));

  if (slResult.hasSl) {
    name.push(plain(configName.sl));
  }

  const infras = infraTaxa(nomenclature);

  if (species === subsp || species === varieta || species === forma) {
    if (authors) {
      name.push(plain(authors));
    }
    isAuthorLast = false;
  }

  name = name.concat(infras);

  if (isAuthorLast && authors) {
    name.push(plain(authors));
  }

  const {
    genusH, speciesH, subspH, varH, subvarH, formaH,
    nothosubspH, nothoformaH, authorsH,
  } = nomenclature;
  if (
    genusH || speciesH || subspH || varH || subvarH || formaH
    || nothosubspH || nothoformaH || authorsH
  ) {
    const h = {
      genus: genusH,
      species: speciesH,
      subsp: subspH,
      var: varH,
      subvar: subvarH,
      forma: formaH,
      nothosubsp: nothosubspH,
      nothoforma: nothoformaH,
      authors: authorsH,
    };
    name.push(plain(configName.hybrid));
    name = name.concat(listOfSpeciesFormat(h));
  }

  name = invalidDesignation(name, options.syntype);

  if (opts.isPublication && publication) {
    name.push(plain(','));
    name.push(plain(publication));
  }
  const aggregates = [aggregate, subaggregate].filter((a) => !!a);
  if (opts.isAggregates && aggregates.length > 0) {
    const aggregatesString =  `${wrapL}${aggregates.join(', ')}${wrapR}`;
    name.push(plain(aggregatesString));
  }
  if (opts.isTribus && tribus) {
    name.push(plain(tribus));
  }
  return name;
}

function listOfSpeciesString(name, options) {
  const nameArr = listOfSpeciesFormat(name, options);
  return nameArr.map(({ string }) => string).join(' ');
}

/**
 * Creates equality 
 * @param {object} a 
 * @param {object} b 
 * @param {array} properties overrides default properties
 */
function areEqualSpecies(a, b, properties = undefined) {
  const keys = properties || configNameParts;
  const aPicked = pick(a, keys);
  const bPicked = pick(b, keys);
  return isEqual(aPicked, bPicked);
};

export default {
  listOfSpeciesFormat,
  listOfSpeciesString,
  areEqualSpecies,
};
