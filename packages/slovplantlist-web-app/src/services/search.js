import urisConfig from 'config/uris';

import { postRequest } from './client';

const {
  nomenclatureSearch,
} = urisConfig;

async function searchScientific(
  genus, species, infraspecific, status, pagination = {},
) {
  const nonEmptyFields = [genus, species, infraspecific, status]
    .filter((f) => !!f);

  if (nonEmptyFields.length === 0) {
    return undefined;
  }
  const { page, rowsPerPage } = pagination;

  const body = {
    genus,
    species,
    infraspecific,
    status,
    page,
    rowsPerPage,
  };
  const response = await postRequest(nomenclatureSearch.scientificUri, body);
  return response.data;
}

export default {
  searchScientific,
};
