export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const REGISTER_USER = 'REGISTER_USER';
export const STORE_AUTH_ERROR = 'STORE_AUTH_ERROR';

export const loginUser = (email, password, token, name = '', surname = '') => ({
  type: LOGIN_USER,
  payload: { email, password, name, surname, token }
});
export const logoutUser = () => ({ type: LOGOUT_USER });
export const authenticateUser = (email, password) => ({
  type: AUTHENTICATE_USER,
  payload: { email, password }
});
export const registerUser = (email, password, name, surname) => ({
  type: REGISTER_USER,
  payload: { email, password, name, surname }
});
export const storeAuthError = (error) => ({
  type: STORE_AUTH_ERROR,
  payload: { error }
});