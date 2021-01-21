// import { deleteRequest } from '@ibot/client';
import { WhereBuilder, eq } from '@ibot/utils';

import config from 'config/config';
import {
  deleteRequest,
} from './client';

const { uris: { synonymsUri } } = config;

async function deleteSynonymsByIdParent(idParent, accessToken) {
  const wb = new WhereBuilder();
  const where = wb.add(eq('idParent', idParent)).buildString();

  return deleteRequest(
    synonymsUri.deleteAllSynonymsWhereUri, { where }, accessToken,
  );
}

export default {
  deleteSynonymsByIdParent,
};
