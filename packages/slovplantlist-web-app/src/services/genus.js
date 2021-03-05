import config from 'config/uris';

import { getRequest } from './client';

const { genus } = config;

async function getFamilyApgOfGenus(genusObj) {
  if (!genusObj) {
    return undefined;
  }
  const { id } = genusObj;
  return getRequest(genus.getFamilyApgOfGenusUri, { id });
}

export default {
  getFamilyApgOfGenus,
};
