import { LOGIN, LOGOUT } from '../actions';

const initialState = {
  isLoggedIn: false,
  email: '',
  password: '',
  name: ''
};

export function auth (state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        isLoggedIn: true
      }
    }
    case LOGOUT: {
      return {
        ...state,
        isLoggedIn: false
      }
    }
    default:
      return state
  }
}

export const getIsLoggedIn = state => state.auth.isLoggedIn;
export const getEmail = state => state.auth.email;
export const getPassword = state => state.auth.password;
export const getName = state => state.auth.name;