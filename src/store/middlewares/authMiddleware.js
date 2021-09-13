import { AUTHENTICATE, REGISTER, login, storeAuthError } from '../actions/auth';
import { serverLogin, serverRegistration } from '../../api';

export const authMiddleware = (store) => (next) => async (action) => {
  if (action.type === AUTHENTICATE) {
    const { email, password } = action.payload;
    const { success, token = '', error } = await serverLogin(email, password);

    if (success) {
      store.dispatch(login(email, password, token));
    }
    if (error) {
      store.dispatch(storeAuthError(error));
    }
  } else if (action.type === REGISTER) {
    const { email, password, name, surname } = action.payload;
    const { success, token = '', error } = await serverRegistration( email, password, name, surname);

    if (success) {
      store.dispatch(login(email, password, token, name, surname));
    }
    if (error) {
      store.dispatch(storeAuthError(error));
    }
  }

  next(action);
};