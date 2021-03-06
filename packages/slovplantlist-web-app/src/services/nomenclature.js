import config from 'config/uris';

import { getRequest } from './client';

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

async function getForRelationsOfId(id) {
  return getRequest(nomenclature.getForRelationsUri, { id });
}

export default {
  getNomenclatureById,
  getSynonymsOfId,
  getInvalidDesignationsOfId,
  getMisidentificationsOfId,
  getForRelationsOfId,
};
