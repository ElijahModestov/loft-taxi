import { LOGIN, LOGOUT, STORE_AUTH_ERROR } from '../actions/auth';
import { cacheObject, getCachedObject, removeCachedObject } from '../../caching';

const initialState = {
  isLoggedIn: false,
  email: '',
  password: '',
  name: '',
  surname: '',
  token: '',
  error: ''
};
const cachedState = getCachedObject('auth');
const combinedState = {
  ...initialState,
  ...cachedState
};

export function auth (state = combinedState, action) {
  switch (action.type) {
    case LOGIN: {
      const { email, password, token, name, surname } = action.payload;

      cacheObject('auth', {
        isLoggedIn: true,
        email,
        token,
        name,
        surname
      });

      return {
        ...state,
        isLoggedIn: true,
        email,
        password,
        name,
        surname,
        token
      }
    }
    case LOGOUT: {
      removeCachedObject('auth');

      return {
        ...initialState
      }
    }
    case STORE_AUTH_ERROR: {
      const { error } = action.payload;

      return {
        ...state,
        error
      }
    }
    default:
      return state
  }
}

export const getIsLoggedIn = state => state.auth.isLoggedIn;
export const getEmail = state => state.auth.email;
export const getPassword = state => state.auth.password;
export const getToken = state => state.auth.token;
export const getAuthError = state => state.auth.error;