import { italic, plain, makeFormat } from './common';
import config from '../config';

const {
  species: {
    name: configName,
  },
} = config;

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
    ...options,
  };
  const {
    species, genus,
    subsp, var: varieta, forma,
    authors, publication, tribus,
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
  if (opts.isTribus && tribus) {
    name.push(plain(tribus));
  }
  return name;
}

function listOfSpeciesString(name) {
  const nameArr = listOfSpeciesFormat(name);
  return nameArr.map(({ string }) => string).join(' ');
}

export default {
  listOfSpeciesFormat,
  listOfSpeciesString,
};
