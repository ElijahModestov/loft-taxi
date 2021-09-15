import { takeEvery, call, put } from 'redux-saga/effects';
import { FETCH_ADDRESSES_DATA, storeAddressesData } from '../actions/addresses';
import { serverAddressesData } from '../../api';

export function* storeAddressesSaga() {
  const addressesList = yield call(serverAddressesData);

  yield put(storeAddressesData(addressesList));
}

export function* addressesSaga() {
  yield takeEvery(FETCH_ADDRESSES_DATA, storeAddressesSaga);
}