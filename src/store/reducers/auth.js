import { LOGIN, LOGOUT, STORE_AUTH_ERROR } from '../actions/auth';

const initialState = {
  isLoggedIn: false,
  email: '',
  password: '',
  name: '',
  surname: '',
  token: '',
  error: ''
};
const cachedState = JSON.parse(localStorage.getItem('auth'));
const combinedState = {
  ...initialState,
  ...cachedState
};

export function auth (state = combinedState, action) {
  switch (action.type) {
    case LOGIN: {
      const { email, password, token, name, surname } = action.payload;

      localStorage.setItem('auth', JSON.stringify({
        isLoggedIn: true,
        email,
        token,
        name,
        surname
      }));

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
      localStorage.removeItem('auth');

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