import { recordSaga } from './utils/recordSaga';
import { authSaga } from './authSaga';
import { LOGIN, authenticate, register } from '../actions/auth';

jest.mock('../../api', () => ({
  serverLogin: jest.fn(() => ({
    success: true,
    token: 'test_token'
  })),
  serverRegistration: jest.fn(() => ({
    success: true,
    token: 'test_token'
  }))
}));

describe('authSaga', () => {
  describe('#AUTHENTICATE', () => {
    it('authenticates through api', async () => {
      const dispatched = await recordSaga(
        authSaga,
        authenticate('test_email', 'test_password')
      );
      expect(dispatched).toEqual([
        {
          type: LOGIN,
          payload: {
            email: 'test_email',
            password: 'test_password',
            name: '',
            surname: '',
            token: 'test_token'
          }
        }
      ]);
    });
  });
  describe('#REGISTER', () => {
    it('registers through api', async () => {
      const dispatched = await recordSaga(
        authSaga,
        register('test_email', 'test_password', 'test_name', 'test_surname')
      );
      expect(dispatched).toEqual([
        {
          type: LOGIN,
          payload: {
            email: 'test_email',
            password: 'test_password',
            name: 'test_name',
            surname: 'test_surname',
            token: 'test_token'
          }
        }
      ]);
    });
  });
});