// import { getRequest } from '@ibot/client';
import {
  getRequest,
} from './client';

async function getAll(
  uri, offset, whereString = '{}', orderString = '["id ASC"]',
  limit, accessToken,
) {
  const where = (typeof whereString === 'string')
    ? whereString : JSON.stringify(whereString);
  const params = {
    offset,
    where,
    order: orderString,
    limit,
  };
  return getRequest(uri, params, accessToken);
}

async function getCount(uri, whereString, accessToken) {
  const { count } = await getRequest(uri, { whereString }, accessToken);
  return count;
}

export default {
  getAll,
  getCount,
};
