export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE';
export const REGISTER = 'REGISTER';
export const UPDATE_PAYMENT_DATA = 'UPDATE_PAYMENT_DATA';
export const FETCH_PAYMENT_DATA = 'FETCH_PAYMENT_DATA';
export const STORE_PAYMENT_DATA = 'STORE_PAYMENT_DATA';

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
export const updatePaymentData = (cardName, cardNumber, expiryDate, cvc, token) => ({
  type: UPDATE_PAYMENT_DATA,
  payload: { cardName, cardNumber, expiryDate, cvc, token }
});
export const fetchPaymentData = (token) => ({
  type: FETCH_PAYMENT_DATA,
  payload: { token }
});
export const storePaymentData = (cardName, cardNumber, expiryDate, cvc) => ({
  type: STORE_PAYMENT_DATA,
  payload: { cardName, cardNumber, expiryDate, cvc }
});