import config from 'config/config';

import { getRequest, postRequest } from './client';

const {
  uris: { usersUri },
} = config;

async function getAllUsers(accessToken) {
  return getRequest(usersUri.getAllWOrderUri, {}, accessToken);
}

async function getUserById(id, accessToken) {
  const user = await getRequest(
    usersUri.getByIdWithRolesUri, { id }, accessToken,
  );
  user.password = '';
  const { roles } = user;

  delete user.roles;

  return {
    user,
    roles,
  };
}

async function getGeneraOfUser(userId, accessToken, format = undefined) {
  const genera = await getRequest(
    usersUri.getGeneraByUserId, { id: userId }, accessToken,
  );

  if (!format) {
    return genera;
  }
  return genera.map(format);
}

async function saveUser(data, accessToken) {
  const user = {
    ...data,
    realm: config.constants.userRealm,
  };
  if (data.id) {
    if (!user.password) { // when editing, password is set to empty, unless set new
      delete user.password;
    }
    await postRequest(
      usersUri.updateByIdUri, user,
      { id: user.id }, accessToken,
    );
    return user.id;
  }
  return postRequest(
    usersUri.baseUri, data, undefined, accessToken,
  );
}

async function login(username, password) {
  const data = { username, password };
  const response = await postRequest(
    usersUri.loginUri, data, undefined, undefined,
  );
  return response.data;
}

async function logout(accessToken) {
  return postRequest(usersUri.logoutUri, undefined, undefined, accessToken);
}

export default {
  getAllUsers,
  getUserById,
  getGeneraOfUser,
  saveUser,
  login,
  logout,
};
