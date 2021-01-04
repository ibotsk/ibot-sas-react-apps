import config from '../../config';

const HTTP_UNAUTHORIZED = 401;
const { keyState } = config;

// TODO replace with local storage removeState when package handling it will exist
const removeState = () => {
  try {
    localStorage.removeItem(keyState);
  } catch {
    // ignore
  }
}

function handleAxiosError(error) {
  if (!error.response) {
    return;
  }
  switch (error.response.status) {
    case HTTP_UNAUTHORIZED:
      removeState();
      window.location.reload(true);
      break;
    default:
      break;
  }
}

export default {
  handleAxiosError,
};
