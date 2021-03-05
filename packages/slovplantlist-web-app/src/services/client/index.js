import client from '@ibot/client';

const instance = client();

const { getRequest, postRequest } = instance;

export {
  getRequest,
  postRequest,
};
