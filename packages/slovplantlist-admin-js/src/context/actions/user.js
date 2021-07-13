export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';

export const setUser = (id, role, userGenera, username) => ({
  type: SET_USER,
  role,
  userGenera,
  id,
  username,
});

export const unsetUser = () => ({
  type: UNSET_USER,
});
