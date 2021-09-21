import { serverPaymentUpdate, serverPaymentData } from '../../../api';
import { recordSaga } from '../utils/recordSaga';
import { profileSaga } from '../profileSaga';
import { STORE_PAYMENT_DATA, fetchPaymentData, updatePaymentData } from '../../actions/profile';

jest.mock('../../../api', () => ({
  serverPaymentUpdate: jest.fn(() => {}),
  serverPaymentData: jest.fn(() => {})
}));

describe('profileSaga', () => {
  describe('#UPDATE_PAYMENT_DATA', () => {
    serverPaymentUpdate.mockImplementation(() => ({ success: true }));
    serverPaymentData.mockImplementation(() => ({
      cardName: 'test_card_name',
      cardNumber: 'test_card_number',
      expiryDate: 'test_expiry_date',
      cvc: 'test_cvc'
    }));
    it('updates payment data through api', async () => {
      const dispatched = await recordSaga(
        profileSaga,
        updatePaymentData('test_card_name', 'test_card_number',
          'test_expiry_date', 'test_cvc')
      );
      expect(dispatched).toEqual([
        {
          type: STORE_PAYMENT_DATA,
          payload: {
            cardName: 'test_card_name',
            cardNumber: 'test_card_number',
            expiryDate: 'test_expiry_date',
            cvc: 'test_cvc'
          }
        }
      ]);
    });
  });
  describe('#FETCH_PAYMENT_DATA', () => {
    it('gets payment data through api', async () => {
      const dispatched = await recordSaga(
        profileSaga,
        fetchPaymentData('test_token')
      );
      expect(dispatched).toEqual([
        {
          type: STORE_PAYMENT_DATA,
          payload: {
            cardName: 'test_card_name',
            cardNumber: 'test_card_number',
            expiryDate: 'test_expiry_date',
            cvc: 'test_cvc'
          }
        }
      ]);
    });
  });
});