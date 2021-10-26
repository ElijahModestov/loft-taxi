import { serverRouteData } from '../../../api';
import { recordSaga } from '../utils/recordSaga';
import { routeSaga } from '../routeSaga';
import { STORE_ROUTE_DATA, fetchRouteData } from '../../actions/route';

jest.mock('../../../api', () => ({
  serverRouteData: jest.fn(() => {})
}));

describe('routeSaga', () => {
  describe('#FETCH_ROUTE_DATA', () => {
    it('fetches route data through api', async () => {
      serverRouteData.mockImplementation(() => [[11, 22], [33, 44]])
      const dispatched = await recordSaga(
        routeSaga,
        fetchRouteData('test_address_1', 'test_address_2')
      );
      expect(dispatched).toEqual([
        {
          type: STORE_ROUTE_DATA,
          payload: [[11, 22], [33, 44]]
        }
      ]);
    });
  });
});