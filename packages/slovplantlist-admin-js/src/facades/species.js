import { where as whereUtils } from '@ibot/utils';
import { sorterUtils } from 'utils';
import config from 'config/config';

import { getRequest, putRequest, patchRequest } from './client';
import common from './common/common';

const {
  constants: {
    insertedMethod: insertedMethodConf,
    updatedMethod: updatedMethodConf,
  },
  uris: { nomenclaturesUri, synonymsUri, nomenStatusUri },
} = config;

const upsertNomenStatus = async (data, accessToken) => (
  putRequest(nomenStatusUri.baseUri, data, {}, accessToken)
);

async function getRecordById(id, accessToken) {
  const speciesRecord = await getRequest(
    nomenclaturesUri.getByIdWFilterUri, { id }, accessToken,
  );

  const {
    accepted,
    'nomen-status': nomenStatus,
    basionym,
    replaced,
    'nomen-novum': nomenNovum,
    'parent-combination': parentCombination,
    'taxon-position': taxonPosition,
  } = speciesRecord;

  let genus;
  let familyApg;
  let family;
  if (speciesRecord['genus-rel']) {
    genus = {
      id: speciesRecord['genus-rel'].id,
      label: speciesRecord['genus-rel'].name,
    };
    const famAPG = speciesRecord['genus-rel']['family-apg'];
    const fam = speciesRecord['genus-rel'].family;
    if (famAPG) {
      familyApg = famAPG.name;
    }
    if (fam) {
      family = fam.name;
    }
  }

  delete speciesRecord.accepted;
  delete speciesRecord.basionym;
  delete speciesRecord.replaced;
  delete speciesRecord['nomen-novum'];
  delete speciesRecord['parent-combination'];
  delete speciesRecord['taxon-position'];
  delete speciesRecord['genus-rel'];
  delete speciesRecord['nomen-status'];

  return {
    speciesRecord,
    nomenStatus,
    accepted,
    basionym,
    replaced,
    nomenNovum,
    parentCombination,
    taxonPosition,
    genus,
    familyApg,
    family,
  };
}

async function getSpeciesById(id, accessToken) {
  return getRequest(nomenclaturesUri.getByIdUri, { id }, accessToken);
}

async function getAllSpecies(accessToken, format = undefined) {
  const listOfSpeciess = await getRequest(
    nomenclaturesUri.getAllWOrderUri, {}, accessToken,
  );
  if (!format) {
    return listOfSpeciess;
  }
  return listOfSpeciess.map(format);
}

async function getAllSpeciesBySearchTerm(
  term, accessToken, format = undefined,
) {
  const listOfSpeciess = await getRequest(
    nomenclaturesUri.getAllBySearchTermUri, { term }, accessToken,
  );

  if (!format) {
    return listOfSpeciess;
  }
  return listOfSpeciess.map(format);
}

async function getSpeciesByAll(
  data, accessToken, formatFound = undefined,
  {
    exclude = undefined,
    include = undefined,
    exact = false,
  } = {},
) {
  const where = whereUtils.whereDataAll(data, exclude, include, exact);
  const species = await getRequest(
    nomenclaturesUri.getAllWFilterUri, {
      where: JSON.stringify(where),
    }, accessToken,
  );

  let found = species;
  if (formatFound) {
    found = formatFound(found);
  }
  return {
    term: data,
    found,
  };
}

async function getSynonyms(id, accessToken) {
  const nomenclatoricSynonyms = await getRequest(
    nomenclaturesUri.getNomenclatoricSynonymsUri, { id }, accessToken,
  );
  nomenclatoricSynonyms.sort(sorterUtils.listOfSpeciesSorterLex);

  const taxonomicSynonyms = await getRequest(
    nomenclaturesUri.getTaxonomicSynonymsUri, { id }, accessToken,
  );
  taxonomicSynonyms.sort(sorterUtils.listOfSpeciesSorterLex);

  const invalidDesignations = await getRequest(
    nomenclaturesUri.getInvalidSynonymsUri, { id }, accessToken,
  );
  invalidDesignations.sort(sorterUtils.listOfSpeciesSorterLex);

  const misidentifications = await getRequest(
    nomenclaturesUri.getMisidentificationsUri, { id }, accessToken,
  );

  const otherSynonyms = await getRequest(
    nomenclaturesUri.getOtherSynonyms, { id }, accessToken,
  );

  return {
    nomenclatoricSynonyms,
    taxonomicSynonyms,
    invalidDesignations,
    misidentifications,
    otherSynonyms,
  };
}

async function getForRelations(id, accessToken, format = (x) => x) {
  const basionymFor = await getRequest(
    nomenclaturesUri.getBasionymForUri, { id }, accessToken,
  );
  const replacedFor = await getRequest(
    nomenclaturesUri.getReplacedForUri, { id }, accessToken,
  );
  const nomenNovumFor = await getRequest(
    nomenclaturesUri.getNomenNovumForUri, { id }, accessToken,
  );
  const parentCombinationFor = await getRequest(
    nomenclaturesUri.getParentCombinationForUri, { id }, accessToken,
  );
  const taxonPositionFor = await getRequest(
    nomenclaturesUri.getTaxonPositionForUri, { id }, accessToken,
  );
  return {
    basionymFor: basionymFor.map(format),
    replacedFor: replacedFor.map(format),
    nomenNovumFor: nomenNovumFor.map(format),
    parentCombinationFor: parentCombinationFor.map(format),
    taxonPositionFor: taxonPositionFor.map(format),
  };
}

async function saveSpecies(
  data, accessToken, {
    insertedBy,
    insertedMethod = insertedMethodConf.form,
    updatedBy,
    updatedMethod = updatedMethodConf.form,
  },
) {
  let dataToSave = data;
  if (!data.id) {
    // only create
    dataToSave = {
      ...data,
      insertedBy,
      insertedMethod,
    };
  } else {
    dataToSave = {
      ...data,
      updatedBy,
      updatedMethod,
    };
  }

  return putRequest(
    nomenclaturesUri.baseUri, dataToSave,
    undefined, accessToken,
  );
}

async function saveSpeciesAndSynonyms({
  species,
  synonyms,
  nomenStatus,
  accessToken,
  insertedBy,
  insertedMethod = insertedMethodConf.form,
  updatedBy,
  updatedMethod = updatedMethodConf.form,
}) {
  const { data } = await saveSpecies(
    species, accessToken, {
      insertedBy,
      insertedMethod,
      updatedBy,
      updatedMethod,
    },
  );

  await upsertNomenStatus({
    ...nomenStatus,
    idNomenclature: data.id,
  }, accessToken);

  await common.submitSynonyms(data.id, synonyms, {
    getCurrentSynonymsUri: nomenclaturesUri.getSynonymsOfParent,
    deleteSynonymsByIdUri: synonymsUri.synonymsByIdUri,
    updateSynonymsUri: synonymsUri.baseUri,
  }, accessToken);

  return data.id;
}

function patchSpecies(id, data, accessToken) {
  return patchRequest(
    nomenclaturesUri.getByIdUri, data, { id }, accessToken,
  );
}

function createSynonym(idParent, idSynonym, syntype) {
  return {
    idParent: idParent ? parseInt(idParent, 10) : null,
    idSynonym,
    syntype,
  };
}

export default {
  getRecordById,
  getSpeciesById,
  getAllSpecies,
  getAllSpeciesBySearchTerm,
  getSpeciesByAll,
  getSynonyms,
  getForRelations,
  saveSpeciesAndSynonyms,
  saveSpecies,
  patchSpecies,
  createSynonym,
};
