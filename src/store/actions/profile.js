export const UPDATE_PAYMENT_DATA = 'UPDATE_PAYMENT_DATA';
export const FETCH_PAYMENT_DATA = 'FETCH_PAYMENT_DATA';
export const STORE_PAYMENT_DATA = 'STORE_PAYMENT_DATA';
export const STORE_PAYMENT_ERROR = 'STORE_PAYMENT_ERROR';

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
export const storePaymentError = (error) => ({
  type: STORE_PAYMENT_ERROR,
  payload: { error }
});