import { profileMiddleware } from './profileMiddleware';
import { updatePaymentData, fetchPaymentData } from '../actions';
import {serverPaymentUpdate, serverPaymentData, serverLogin} from '../api';

const apiMockResponseUpdate = { success: true };
const apiMockResponseFetch = {
  cardName: 'test_card_name',
  cardNumber: 'test_card_number',
  expiryDate: 'test_expiry_date',
  cvc: 'test_cvc'
};

jest.mock('../api', () => ({
  serverPaymentUpdate: jest.fn(() => apiMockResponseUpdate),
  serverPaymentData: jest.fn(() => apiMockResponseFetch)
}));

describe('profileMiddleware', () => {
  afterAll(jest.clearAllMocks);

  describe('#UPDATE_PAYMENT_DATA', () => {
    it('updates payment profile through api', async () => {
      serverPaymentUpdate.mockImplementation(async () => apiMockResponseUpdate);
      const dispatch = jest.fn();
      const next = jest.fn();

      await profileMiddleware({ dispatch })(next)(
        updatePaymentData('test_card_name', 'test_card_number',
          'test_expiry_date', 'test_cvc', 'test_token')
      );
      expect(serverPaymentUpdate).toBeCalledWith('test_card_name', 'test_card_number',
        'test_expiry_date', 'test_cvc', 'test_token');
      expect(dispatch).toBeCalledWith({
        type: 'STORE_PAYMENT_DATA',
        payload: {
          cardName: 'test_card_name',
          cardNumber: 'test_card_number',
          expiryDate: 'test_expiry_date',
          cvc: 'test_cvc'
        }
      });
    });
  });
  describe('#FETCH_PAYMENT_DATA', () => {
    it('gets payment profile data from api', async () => {
      serverPaymentData.mockImplementation(async () => apiMockResponseFetch);
      const dispatch = jest.fn();
      const next = jest.fn();

      await profileMiddleware({ dispatch })(next)(
        fetchPaymentData('test_token')
      );
      expect(serverPaymentData).toBeCalledWith('test_token');
      expect(dispatch).toBeCalledWith({
        type: 'STORE_PAYMENT_DATA',
        payload: {
          cardName: 'test_card_name',
          cardNumber: 'test_card_number',
          expiryDate: 'test_expiry_date',
          cvc: 'test_cvc'
        }
      });
    });
  });
});