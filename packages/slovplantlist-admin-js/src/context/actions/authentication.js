export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const UNSET_AUTHENTICATED = 'UNSET_AUTHENTICATED';

export const setAuthenticated = (token) => ({
  type: SET_AUTHENTICATED,
  accessToken: token,
  isAuthenticated: true,
});

export const unsetAuthenticated = () => ({
  type: UNSET_AUTHENTICATED,
});
