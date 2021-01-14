import {
  misc,
} from '@ibot/utils';

import speciesFacade from './species';
import genusFacade from './genus';

import config from 'config/config';

const {
  mappings: { losType },
} = config;

async function importChecklistPrepare(
  data, accessToken, onIncreaseCounter = (i, total) => {},
) {
  // report gathers info
  const dataToImport = [];

  let currentAccNameRowId; // holds rowId for its synonym to use (rows with synonyms follow immediately after their accepted name)
  let rowId = 0;
  for (const row of data) {
    const { syntype, ntype, ...nomen } = row;
    // check for exact match on all provided fields in row, except ntype and syntype
    const { found } = await speciesFacade.getSpeciesByAll(
      nomen, accessToken,
    );

    let speciesForImport = {};
    const errors = [];
    let operation;

    if (!found || found.length === 0) {
      const etnRow = misc.emptyToNull(nomen);
      speciesForImport = etnRow;
      operation = 'create';
    } else {
      speciesForImport = found[0];
      operation = 'update';
    }

    // regardless if species exists, we want to use ntype from imported data
    const newNtype = ntype || losType.S.key; // row with empty ntype is synonym
    speciesForImport.ntype = newNtype;

    // get idGenus by name, if not found, add it to report
    const { genus: genusName } = nomen;
    const foundGeneraArray = await genusFacade.getAllGeneraBySearchTerm(
      genusName, accessToken,
    );
    if (!foundGeneraArray || foundGeneraArray.length === 0) {
      errors.push({
        reason: `Genus '${genusName}' was not found`,
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
          reason: 'No accepted name for synonym',
        })
      }
    }

    dataToImport.push({
      rowId: rowId + 2, // in excel/csv 0 does not exist, 1 is heading 
      species: speciesForImport,
      acceptedNameRowId,
      operation,
      errors,
    });
    // update accepted name row id
    if (newNtype === losType.A.key) {
      currentAccNameRowId = rowId;
    }

    onIncreaseCounter(rowId + 1, data.length);
    rowId += 1;
  }

  return dataToImport;
}

async function importChecklist(data, accessToken) {
  const acceptedNamesIds = {}; // key = accepted name rowId, value = accepted name id
  for (const row of data) {
    const { species, rowId, acceptedNameRowId } = row;

    if (acceptedNameRowId) {
      // only synonyms should have this prop not empty
      species.idAcceptedName = acceptedNamesIds[acceptedNameRowId];
    }

    console.log(acceptedNamesIds);
    console.log({ species });
    const { data } = await speciesFacade.saveSpecies(species, accessToken);
    const { id } = data;

    if (species.ntype === losType.A.key)  {
      // store id of the accepted name
      acceptedNamesIds[rowId] = id;
    }

    // do synonyms
  }
}

export default {
  importChecklistPrepare,
  importChecklist,
};
