import client from '@ibot/client';
import { misc as miscUtils } from '@ibot/utils';

const instance = client({
  requestInterceptors: [
    (request) => ({
      ...request,
      data: miscUtils.emptyToNull(request.data),
    }),
  ],
});
const {
  getRequest, postRequest, putRequest, patchRequest, deleteRequest,
} = instance;

export {
  getRequest,
  postRequest,
  putRequest,
  patchRequest,
  deleteRequest,
};
