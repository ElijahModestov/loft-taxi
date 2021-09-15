import { authMiddleware } from './authMiddleware';
import { authenticate, register } from '../actions/auth';
import { serverLogin, serverRegistration } from '../../api';

const apiMockResponse = {
  success: true,
  token: 'test_token'
};

jest.mock('../../api', () => ({
  serverLogin: jest.fn(() => apiMockResponse),
  serverRegistration: jest.fn(() => apiMockResponse)
}));

describe('authMiddleware', () => {
  afterAll(jest.clearAllMocks);

  describe('#AUTHENTICATE', () => {
    describe('with correct credentials', () => {
      it('authenticates through api', async () => {
        serverLogin.mockImplementation(async () => apiMockResponse);
        const dispatch = jest.fn();
        const next = jest.fn();

        await authMiddleware({ dispatch })(next)(
          authenticate('test_login', 'test_password')
        );
        expect(serverLogin).toBeCalledWith('test_login', 'test_password');
        expect(dispatch).toBeCalledWith({
          type: 'LOGIN',
          payload: {
            email: 'test_login',
            name: '',
            password: 'test_password',
            surname: '',
            token: 'test_token'
          }
        });
      });
    });
    describe('with wrong credentials', () => {
      it('authenticates through api', async () => {
        serverLogin.mockImplementation(() => false);
        const dispatch = jest.fn();
        const next = jest.fn();

        await authMiddleware({ dispatch })(next)(
          authenticate('test_login', 'test_password')
        );
        expect(dispatch).not.toBeCalled();
      });
    });
  });
  describe('#REGISTER', () => {
    it('registers through api', async () => {
      serverRegistration.mockImplementation(async () => apiMockResponse);
      const dispatch = jest.fn();
      const next = jest.fn();

      await authMiddleware({ dispatch })(next)(
        register('test_email', 'test_password', 'test_name', 'test_surname')
      );
      expect(serverRegistration).toBeCalledWith('test_email', 'test_password', 'test_name', 'test_surname');
      expect(dispatch).toBeCalledWith({
        type: 'LOGIN',
        payload: {
          email: 'test_email',
          name: 'test_name',
          password: 'test_password',
          surname: 'test_surname',
          token: 'test_token'
        }
      });
    });
  });
});