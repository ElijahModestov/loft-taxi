import { fork, all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { profileSaga } from './profileSaga';
import { addressesSaga } from './addressesSaga';
import { routeSaga } from './routeSaga';

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(profileSaga),
    fork(addressesSaga),
    fork(routeSaga)
  ]);
}