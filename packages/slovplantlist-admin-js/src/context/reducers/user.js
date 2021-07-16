/* eslint-disable import/prefer-default-export */
import { SET_USER, UNSET_USER } from '../actions/user';

const initialState = {};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        id: action.id,
        role: action.role,
        userGenera: action.userGenera,
        username: action.username,
      };
    case UNSET_USER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
