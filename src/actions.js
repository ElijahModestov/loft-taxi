export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE';
export const REGISTER = 'REGISTER';

export const login = () => ({ type: LOGIN });
export const logout = () => ({ type: LOGOUT });
export const authenticate = (email, password) => ({
  type: AUTHENTICATE,
  payload: { email, password }
});
export const register = (email, password, name) => ({
  type: REGISTER,
  payload: { email, password, name }
});