export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE';
export const REGISTER = 'REGISTER';
export const STORE_AUTH_ERROR = 'STORE_AUTH_ERROR';

export const login = (email, password, token, name = '', surname = '') => ({
  type: LOGIN,
  payload: { email, password, name, surname, token }
});
export const logout = () => ({ type: LOGOUT });
export const authenticate = (email, password) => ({
  type: AUTHENTICATE,
  payload: { email, password }
});
export const register = (email, password, name, surname) => ({
  type: REGISTER,
  payload: { email, password, name, surname }
});
export const storeAuthError = (error) => ({
  type: STORE_AUTH_ERROR,
  payload: { error }
});