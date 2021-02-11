/* eslint-disable no-await-in-loop */
import {
  misc as miscUtils,
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
  constants: {
    insertedMethod: insertedMethodConfig,
    updatedMethod: updatedMethodConfig,
  },
} = config;
const {
  columns,
  constants: {
    operation: operationConfig,
    trimChars,
    legalSynonyms,
    referenceSyntype,
  },
  mappings: { syntypeString: syntypeStringConfig },
} = importConfig;

const columnsForGetSpecies = Object.keys(columns)
  .filter((k) => columns[k].compareInDB === true)
  .map((k) => columns[k].name);

const cureData = (data) => {
  const etndata = miscUtils.emptyToNull(data);
  return miscUtils.replaceNonBreakingSpaces(etndata);
};

// duplicate: row is twice in the data and (ntype === 'A' or the synonym is assigned to a duplicate accepted)
const checkForDuplicateRows = (data) => {
  const rowIdToDuplicates = new Map();
  const reference = new Map();

  const dataToCheck = [...data];
  dataToCheck.forEach((row) => {
    const {
      record, rowId, acceptedNameRowId, operation, duplicates = [],
    } = row;
    const speciesKey = miscUtils.stringifyObj(record, columnsForGetSpecies);
    let assignedOperation = operation;

    if (reference.has(speciesKey)) {
      const referencedDuplicate = reference.get(speciesKey);
      assignedOperation = operationConfig.duplicate.key;
      duplicates.push(referencedDuplicate.rowId);

      if (record.ntype !== losType.A.key) {
        const acceptedDuplicates = rowIdToDuplicates.get(acceptedNameRowId);
        if (!acceptedDuplicates || acceptedDuplicates.length === 0) {
          // eslint-disable-next-line no-param-reassign
          row.save = false;
          assignedOperation = operation; // leave the original operation
        }
      }

      // eslint-disable-next-line no-param-reassign
      row.operation = assignedOperation;
    }
    rowIdToDuplicates.set(rowId, duplicates);
    reference.set(speciesKey, { rowId, acceptedNameRowId });
  });
  return dataToCheck;
};

/**
 * Pushes a synonym entity to the synonymsOfParent and deletes all existing synonyms
 * of the species, because it itself has become a synonym.
 * @param {{ id:number, ntype:string, idAcceptedName:number, syntype:string }} species
 * @param {array} synonymsOfParent
 * @param {string} accessToken
 */
const processSynonym = async (
  species, synonymsOfParent, idAcceptedName, syntype, accessToken,
) => {
  const { id } = species;
  const syntypeString = syntype || '';

  const syntypeName = syntypeStringConfig[syntypeString];

  // create only known types
  if (syntypeName !== undefined) {
    const syntypeValue = synonymTypes[syntypeName].numType;
    synonymsOfParent.push(
      common.createSynonym(idAcceptedName, id, syntypeValue),
    );
    // delete all possibly existing synonyms of this synonym
    await synonymsFacade.deleteSynonymsByIdParent(id, accessToken);
  }

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

const patchAcceptedNames = async (mapOfAcceptedIds, accessToken) => {
  const promises = [];
  mapOfAcceptedIds.forEach((val, key) => {
    promises.push(speciesFacade.patchSpecies(key, val, accessToken));
  });
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

    // check for exact match on all provided fields in row, except ntype and syntype
    const { found } = await speciesFacade.getSpeciesByAll(
      curedNomen, accessToken, undefined,
      {
        include: columnsForGetSpecies,
        exact: true,
      },
    );

    if (!found || found.length === 0) {
      // all new
      speciesForImport = curedNomen;
      operation = operationConfig.create.key;
    } else {
      const [firstFound] = found;
      // merge existing with imported
      speciesForImport = {
        ...firstFound,
        ...curedNomen,
      };
      operation = operationConfig.update.key;
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
    if (genusName) {
      const genusTrimmed = miscUtils.trim(genusName, trimChars);
      const foundGeneraArray = await genusFacade.getAllGeneraBySearchTerm(
        genusTrimmed, accessToken,
      );
      if (!foundGeneraArray || foundGeneraArray.length === 0) {
        errors.push({
          message: `Genus '${genusName}' was not found`,
          ref: 'idGenus',
        });
      } else {
        speciesForImport.idGenus = foundGeneraArray[0].id;
      }
    }

    let newSyntype;
    let acceptedNameRowId;
    if (newNtype === losType.S.key) {
      newSyntype = syntype || '0';
      // add rowId of accepted name only if current row is synonym
      acceptedNameRowId = currentAccNameRowId;
      // speciesForImport.syntype = syntype;
      if (!currentAccNameRowId) {
        errors.push({
          message: 'No accepted name for synonym',
          ref: 'acceptedNameRowId',
        });
      }
    } else {
      // this branch must be present, otherwise acceptedNameRowId would carry over the value from currentAccNameRowId
      acceptedNameRowId = undefined;
      newSyntype = undefined;
    }

    dataToImport.push({
      rowId, // in excel/csv 0 does not exist, 1 is heading
      record: speciesForImport,
      acceptedNameRowId,
      syntype: newSyntype,
      operation,
      errors,
      duplicates: [],
      save: true, // save all by default
    });
    // update accepted name row id
    if (newNtype === losType.A.key) {
      currentAccNameRowId = rowId;
    }

    onIncreaseCounter(rowId - 1, data.length);
    rowId += 1;
  }

  const dataToImportWithDuplicates = checkForDuplicateRows(dataToImport);
  return dataToImportWithDuplicates;
}

async function importChecklist(data, accessToken, {
  insertedBy = null,
  updatedBy = null,
}) {
  const acceptedNamesIds = {}; // key = accepted name rowId, value = accepted name id
  const synonymsByParent = {}; // synonym entities by accepted name id
  const acceptedToParentAndPostion = new Map();

  for (const row of data) {
    const {
      record, rowId, acceptedNameRowId, syntype, operation, save,
    } = row;

    if (operation === operationConfig.duplicate.key) {
      // skip duplicate row
      continue;
    }

    let nomenclatureData;

    if (save === false) {
      const { found } = await speciesFacade.getSpeciesByAll(
        record, accessToken, undefined,
        {
          include: columnsForGetSpecies,
          exact: true,
        },
      );
      if (!found || found.length === 0) {
        throw new Error(
          `Nomenclature record not found but should exist.
          ${JSON.stringify(record)}`,
        );
      }
      const [firstFound] = found;
      nomenclatureData = firstFound;
    } else {
      const { data: savedData } = await speciesFacade.saveSpecies(
        record, accessToken,
        {
          insertedBy,
          insertedMethod: insertedMethodConfig.import,
          updatedBy,
          updatedMethod: updatedMethodConfig.import,
        },
      );
      nomenclatureData = savedData;
    }

    const { id, ntype } = nomenclatureData;

    if (ntype === losType.A.key) {
      // store id of the accepted name
      acceptedNamesIds[rowId] = id;
      // initialize synonyms for current accepted name
      synonymsByParent[id] = [];
    }

    if (ntype === losType.S.key) {
      const idAcceptedName = acceptedNamesIds[acceptedNameRowId];

      if (legalSynonyms.includes(syntype)) {
        synonymsByParent[idAcceptedName] = await processSynonym(
          nomenclatureData, synonymsByParent[idAcceptedName],
          idAcceptedName, syntype,
          accessToken,
        );
      } else {
        // handle parent combination and taxon position
        const parentAndPosition = acceptedToParentAndPostion.get(idAcceptedName)
          || {};

        let newVal = {};
        if (syntype === referenceSyntype.parent) {
          newVal = { idParentCombination: id };
        }
        if (syntype === referenceSyntype.position) {
          newVal = { idTaxonPosition: id };
        }
        acceptedToParentAndPostion.set(
          idAcceptedName,
          {
            ...parentAndPosition,
            ...newVal,
          },
        );
      }
    }
  }

  await Promise.all([
    processSynonymsOfParents(synonymsByParent, accessToken),
    patchAcceptedNames(acceptedToParentAndPostion, accessToken),
  ]);
}

export default {
  importChecklistPrepare,
  importChecklist,
};
