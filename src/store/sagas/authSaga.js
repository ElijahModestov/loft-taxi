import { takeEvery, call, put } from 'redux-saga/effects';
import { AUTHENTICATE_USER, REGISTER_USER, loginUser, storeAuthError } from '../actions/auth';
import { serverLogin, serverRegistration } from '../../api';

export function* authenticateSaga(action) {
  const { email, password } = action.payload;
  const { success, token = '', error } = yield call(serverLogin, email, password);

  if (success) {
    yield put(loginUser(email, password, token));
  }
  if (error) {
    yield put(storeAuthError(error));
  }
}

export function* registerSaga(action) {
  const { email, password, name, surname } = action.payload;
  const { success, token = '', error } = yield call(serverRegistration,
    email, password, name, surname);

  if (success) {
    yield put(loginUser(email, password, token, name, surname));
  }
  if (error) {
    yield put(storeAuthError(error));
  }
}

export function* authSaga() {
  yield takeEvery(AUTHENTICATE_USER, authenticateSaga);
  yield takeEvery(REGISTER_USER, registerSaga);
}