import { getRequest } from './client';
import config from '../config/uris';

const { nomenclature } = config;

async function getNomenclatureById(id) {
  return getRequest(nomenclature.getByIdUri, { id });
}

async function getSynonymsOfId(id) {
  return getRequest(nomenclature.getSynonymsOfIdUri, { id });
}

async function getInvalidDesignationsOfId(id) {
  return getRequest(nomenclature.getInvalidDesignationsOfIdUri, { id });
}

async function getMisidentificationsOfId(id) {
  return getRequest(nomenclature.getMisidentificationsOfIdUri, { id });
}

export default {
  getNomenclatureById,
  getSynonymsOfId,
  getInvalidDesignationsOfId,
  getMisidentificationsOfId,
};
