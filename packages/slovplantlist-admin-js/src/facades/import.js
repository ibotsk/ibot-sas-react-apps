/* eslint-disable no-await-in-loop */
import {
  misc, species as speciesUtils,
} from '@ibot/utils';

import config from 'config/config';
import importConfig from 'config/import';

import common from './common/common';
import genusFacade from './genus';
import speciesFacade from './species';
import synonymsFacade from './synonyms';

const {
  mappings: { losType, synonym: synonymTypes },
  uris: { nomenclaturesUri, synonymsUri },
} = config;
const {
  columns,
  constants: {
    operation: operationConfig,
  },
} = importConfig;

const columnsForGetSpecies = Object.keys(columns)
  .filter((k) => columns[k].compare === true)
  .map((k) => columns[k].name);

const cureData = (data) => {
  const etndata = misc.emptyToNull(data);
  return misc.replaceNonBreakingSpaces(etndata);
};

const checkForDuplicateRows = (species, referenceList = []) => {
  const duplicates = referenceList.filter(({ species: s }) => (
    speciesUtils.areEqualSpecies(species, s, columnsForGetSpecies)
  )).map(({ rowId }) => rowId);

  return duplicates;
};

/**
 * Pushes a synonym entity to the synonymsOfParent and deletes all existing synonyms
 * of the species, because it itself has become a synonym.
 * @param {{ id:number, ntype:string, idAcceptedName:number, syntype:string }} species
 * @param {array} synonymsOfParent
 * @param {string} accessToken
 */
const processSynonym = async (species, synonymsOfParent, accessToken) => {
  const { id, idAcceptedName, syntype } = species;

  // collect synonyms of the same accepted name
  const syntypeCurated = syntype === 'R'
    ? synonymTypes.parent.numType : syntype;

  synonymsOfParent.push(
    common.createSynonym(idAcceptedName, id, syntypeCurated),
  );
  // delete all possibly existing synonyms of this synonym
  await synonymsFacade.deleteSynonymsByIdParent(id, accessToken);

  return synonymsOfParent;
};

/**
 * Saves synonyms in the synonymsByParent. All synonyms are expected to have
 * same idParent.
 * Returns empty array.
 * @param {object} synonymsByParent map of idAcceptedName to array of its synonyms
 * @param {string} accessToken
 */
const processSynonymsOfParents = async (synonymsByParent, accessToken) => {
  const promises = Object.keys(synonymsByParent).map((idParent) => (
    common.submitSynonyms(idParent, synonymsByParent[idParent], {
      getCurrentSynonymsUri: nomenclaturesUri.getSynonymsOfParent,
      deleteSynonymsByIdUri: synonymsUri.synonymsByIdUri,
      updateSynonymsUri: synonymsUri.baseUri,
    }, accessToken)
  ));
  return Promise.all(promises);
};

async function importChecklistPrepare(
  data, accessToken, onIncreaseCounter = () => { },
) {
  // report gathers info
  const dataToImport = [];

  let currentAccNameRowId; // holds rowId for its synonym to use (rows with synonyms follow immediately after their accepted name)
  let rowId = 2;
  for (const row of data) {
    const { syntype, ntype, ...nomen } = row;
    const curedNomen = cureData(nomen);

    let speciesForImport = {};
    const errors = [];
    let operation;

    const duplicates = checkForDuplicateRows(curedNomen, dataToImport);

    // check for exact match on all provided fields in row, except ntype and syntype
    const { found } = await speciesFacade.getSpeciesByAll(
      curedNomen, accessToken, undefined, {
        include: columnsForGetSpecies,
        exact: true,
      },
    );

    if (!found || found.length === 0) {
      speciesForImport = curedNomen;
      operation = operationConfig.create.key;
    } else {
      const [firstFound] = found;
      speciesForImport = firstFound;
      operation = operationConfig.update.key;
    }

    if (duplicates.length > 0) {
      operation = operationConfig.duplicate.key;
    }
    if (ntype !== '' && ntype !== losType.A.key) {
      errors.push({
        message: `Invalid value '${ntype}' in column 'status'`,
        ref: 'ntype',
      });
    }

    // regardless if species exists, we want to use ntype from imported data
    const newNtype = ntype || losType.S.key; // row with empty ntype is synonym
    speciesForImport.ntype = newNtype;

    // get idGenus by name, if not found, add it to report
    const { genus: genusName } = curedNomen;
    const foundGeneraArray = await genusFacade.getAllGeneraBySearchTerm(
      genusName, accessToken,
    );
    if (!foundGeneraArray || foundGeneraArray.length === 0) {
      errors.push({
        message: `Genus '${genusName}' was not found`,
        ref: 'idGenus',
      });
    } else {
      speciesForImport.idGenus = foundGeneraArray[0].id;
    }

    let acceptedNameRowId;
    if (newNtype === losType.S.key) {
      // add rowId of accepted name only if current row is synonym
      acceptedNameRowId = currentAccNameRowId;
      speciesForImport.syntype = syntype;
      if (!currentAccNameRowId) {
        errors.push({
          message: 'No accepted name for synonym',
          ref: 'acceptedNameRowId',
        });
      }
    }

    dataToImport.push({
      rowId, // in excel/csv 0 does not exist, 1 is heading
      species: speciesForImport,
      acceptedNameRowId,
      operation,
      errors,
      duplicates,
    });
    // update accepted name row id
    if (newNtype === losType.A.key) {
      currentAccNameRowId = rowId;
    }

    onIncreaseCounter(rowId - 1, data.length);
    rowId += 1;
  }

  return dataToImport;
}

async function importChecklist(data, accessToken) {
  const acceptedNamesIds = {}; // key = accepted name rowId, value = accepted name id
  const synonymsByParent = {}; // synonym entities by accepted name id

  for (const row of data) {
    const {
      species, rowId, acceptedNameRowId, duplicates,
    } = row;

    if (duplicates && duplicates.length > 0) {
      // skip duplicate row
      continue;
    }

    if (acceptedNameRowId) {
      // S: only synonyms should have this prop not empty
      // idAcceptedName must be set before saving
      species.idAcceptedName = acceptedNamesIds[acceptedNameRowId];
    }

    const { data: savedData } = await speciesFacade.saveSpecies(
      species, accessToken,
    );
    const { id, ntype, idAcceptedName } = savedData;

    if (ntype === losType.A.key) {
      // store id of the accepted name
      acceptedNamesIds[rowId] = id;
      // initialize synonyms for current accepted name
      synonymsByParent[id] = [];
    }

    if (ntype === losType.S.key) {
      synonymsByParent[idAcceptedName] = await processSynonym(
        savedData, synonymsByParent[idAcceptedName], accessToken,
      );
    }
  }

  await processSynonymsOfParents(
    synonymsByParent, accessToken,
  );
}

export default {
  importChecklistPrepare,
  importChecklist,
};
