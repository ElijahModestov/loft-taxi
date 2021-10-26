import { takeEvery, call, put } from 'redux-saga/effects';
import { UPDATE_PAYMENT_DATA, FETCH_PAYMENT_DATA, storePaymentData, storePaymentError } from '../actions/profile';
import { serverPaymentUpdate, serverPaymentData } from '../../api';

export function* updatePaymentSaga(action) {
  const { cardName, cardNumber, expiryDate, cvc, token } = action.payload;
  const { success, error } = yield call(serverPaymentUpdate,
    cardName, cardNumber, expiryDate, cvc, token);

  if (success) {
    yield put(storePaymentData(cardName, cardNumber, expiryDate, cvc));
  }
  if (error) {
    yield put(storePaymentError(error));
  }
}

export function* fetchPaymentSaga(action) {
  const { token } = action.payload;
  const { cardName, cardNumber, expiryDate, cvc, error } = yield call(serverPaymentData, token);

  if (!error) {
    yield put(storePaymentData(cardName, cardNumber, expiryDate, cvc));
  } else {
    yield put(storePaymentError(error));
  }

}

export function* profileSaga() {
  yield takeEvery(UPDATE_PAYMENT_DATA, updatePaymentSaga);
  yield takeEvery(FETCH_PAYMENT_DATA, fetchPaymentSaga);
}