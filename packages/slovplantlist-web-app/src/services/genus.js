import { getRequest } from './client';
import config from '../config/uris';

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
