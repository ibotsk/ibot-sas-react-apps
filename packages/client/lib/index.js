import axios from './axios';
import Mustache from './mustache';

const getRequest = (axiosInstance) => (
  async (uri, params, accessToken) => {
    const parsedUri = Mustache.render(uri, { ...params, accessToken });
    const response = await axiosInstance.get(parsedUri);
    return response.data;
  }
);

const postRequest = (axiosInstance) => (
  async (uri, data, params, accessToken) => {
    const parsedUri = Mustache.render(uri, { ...params, accessToken });
    return axiosInstance.post(parsedUri, data);
  }
);

const putRequest = (axiosInstance) => (
  async (uri, data, params, accessToken) => {
    const parsedUri = Mustache.render(uri, { ...params, accessToken });
    return axiosInstance.put(parsedUri, data);
  }
);

const patchRequest = (axiosInstance) => (
  async (uri, data, params, accessToken) => {
    const parsedUri = Mustache.render(uri, { ...params, accessToken });
    return axiosInstance.patch(parsedUri, data);
  }
);

const deleteRequest = (axiosInstance) => (
  async (uri, params, accessToken) => {
    const parsedUri = Mustache.render(uri, { ...params, accessToken });
    return axiosInstance.delete(parsedUri);
  }
);

const addRequestInterceptor = (interceptor) => {
  axios.interceptors.request.use(interceptor, (error) => Promise.reject(error));
};

// ------------------ //

function init({
  requestInterceptors = [],
}) {
  requestInterceptors.forEach((interceptor) => (
    addRequestInterceptor(interceptor)
  ));

  return {
    getRequest: getRequest(axios),
    postRequest: postRequest(axios),
    putRequest: putRequest(axios),
    patchRequest: patchRequest(axios),
    deleteRequest: deleteRequest(axios),
  };
}

export default init;
