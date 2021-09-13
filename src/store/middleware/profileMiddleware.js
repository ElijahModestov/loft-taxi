import { UPDATE_PAYMENT_DATA, FETCH_PAYMENT_DATA, storePaymentData, storePaymentError } from '../actions/profile';
import { serverPaymentUpdate, serverPaymentData } from '../../api';

export const profileMiddleware = (store) => (next) => async (action) => {
  if (action.type === UPDATE_PAYMENT_DATA) {
    const { cardName, cardNumber, expiryDate, cvc, token } = action.payload;
    const { success, error } = await serverPaymentUpdate(cardName, cardNumber, expiryDate, cvc, token);

    if (success) {
      store.dispatch(storePaymentData(cardName, cardNumber, expiryDate, cvc));
    }
    if (error) {
      store.dispatch(storePaymentError(error));
    }
  } else if (action.type === FETCH_PAYMENT_DATA) {
    const { token } = action.payload;
    const { cardName, cardNumber, expiryDate, cvc } = await serverPaymentData(token);

    store.dispatch(storePaymentData(cardName, cardNumber, expiryDate, cvc));
  }

  next(action);
};