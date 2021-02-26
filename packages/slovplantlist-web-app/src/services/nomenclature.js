import { getRequest } from './client';
import config from '../config/uris';

const { nomenclature } = config;

async function getNomenclatureById(id) {
  return getRequest(nomenclature.getByIdUri, { id });
}

export default {
  getNomenclatureById,
};
