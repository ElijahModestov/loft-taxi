import { AUTHENTICATE, REGISTER, login } from '../actions';
import { serverLogin, serverRegistration } from '../api';

export const authMiddleware = (store) => (next) => async (action) => {
  if (action.type === AUTHENTICATE) {
    const { email, password } = action.payload;
    const { success, token = null } = await serverLogin(email, password);

    if (success) {
      store.dispatch(login(email, password, token));
    }
  } else if (action.type === REGISTER) {
    const { email, password, name, surname } = action.payload;
    const { success, token = null } = await serverRegistration( email, password, name, surname);

    if (success) {
      store.dispatch(login(email, password, token, name, surname));
    }
  }

  next(action);
};