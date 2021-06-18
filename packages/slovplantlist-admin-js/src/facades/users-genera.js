import config from 'config/config';

import { getRequest, postRequest, deleteRequest } from './client';

const {
  uris: { userGeneraUri },
} = config;

const getGeneraIdsOfUser = async (userId, accessToken) => (
  getRequest(userGeneraUri.getGeneraOfUser, { userId }, accessToken)
);

// ----- PUBLIC ----- //

async function saveUserGenera(
  userId, userGenera, accessToken,
) {
  const incomingGeneraIds = [...new Set(userGenera.map(({ id }) => id))];

  const currentGenera = await getGeneraIdsOfUser(userId, accessToken);
  const currentGeneraIds = currentGenera.map(({ idGenus }) => idGenus);

  // genera ids in current and not in incoming -> delete
  // result is record ids
  const recordIdsToDelete = currentGenera
    .filter(({ idGenus }) => !incomingGeneraIds.includes(idGenus))
    .map(({ id }) => id);

  // genera ids in incoming and not in current -> create
  // result is genera ids
  const recordGeneraIdsToCreate = incomingGeneraIds
    .filter((idGenus) => !currentGeneraIds.includes(idGenus));

  const promises = [];
  if (recordIdsToDelete.length > 0) {
    const deletePromises = recordIdsToDelete.map((id) => (
      deleteRequest(userGeneraUri.deleteUri, { id }, accessToken)
    ));
    promises.push(...deletePromises);
  }

  if (recordGeneraIdsToCreate.length > 0) {
    const createPromises = recordGeneraIdsToCreate.map((idGenus) => (
      postRequest(
        userGeneraUri.baseUri,
        {
          idUser: userId,
          idGenus,
        },
        undefined,
        accessToken,
      )
    ));
    promises.push(...createPromises);
  }
  return Promise.all(promises);
}

export default {
  saveUserGenera,
};
