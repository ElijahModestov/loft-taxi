import { takeEvery, call, put } from 'redux-saga/effects';
import { FETCH_ROUTE_DATA, storeRouteData } from '../actions/route';
import { serverRouteData } from '../../api';

export function* storeRouteSaga(action) {
  const { address1, address2 } = action.payload;
  const routeData = yield call(serverRouteData, address1, address2);

  yield put(storeRouteData(routeData));
}

export function* routeSaga() {
  yield takeEvery(FETCH_ROUTE_DATA, storeRouteSaga);
}