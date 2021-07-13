/* eslint-disable import/prefer-default-export */
import {
  SET_AUTHENTICATED,
  UNSET_AUTHENTICATED,
} from '../actions/authentication';

const initialState = {};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        ...{
          accessToken: action.accessToken,
          isAuthenticated: action.isAuthenticated,
        },
      };
    case UNSET_AUTHENTICATED:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
