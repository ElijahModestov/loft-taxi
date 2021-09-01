import { AUTHENTICATE, REGISTER, login } from './actions';
import { serverLogin, serverRegistration } from './api';

export const authMiddleware = (store) => (next) => async (action) => {
  if (action.type === AUTHENTICATE) {
    const { email, password } = action.payload;
    const success = await serverLogin(email, password);

    if (success) {
      store.dispatch(login());
    } else {
      next(action);
    }
  } else if (action.type === REGISTER) {
    const { email, password, name } = action.payload;
    const success = await serverRegistration(email, password, name);

    if (success) {
      store.dispatch(login());
    } else {
      next(action);
    }
  }
};