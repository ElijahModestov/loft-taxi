import { serverAddressesData } from '../../../api';
import { recordSaga } from '../utils/recordSaga';
import { addressesSaga } from '../addressesSaga';
import { STORE_ADDRESSES_DATA, fetchAddressesData } from '../../actions/addresses';

jest.mock('../../../api', () => ({
  serverAddressesData: jest.fn(() => {})
}));

describe('addressesSaga', () => {
  describe('#FETCH_ADDRESSES_DATA', () => {
    it('fetches addresses list through api', async () => {
      serverAddressesData.mockImplementation(() => [{ id: 1, option: 'test_address_1' }]);
      const dispatched = await recordSaga(
        addressesSaga,
        fetchAddressesData()
      );
      expect(dispatched).toEqual([
        {
          type: STORE_ADDRESSES_DATA,
          payload: { addressesList: [{id: 1, option: 'test_address_1'}] }
        }
      ]);
    });
  });
});