import { recordSaga } from './utils/recordSaga';
import { routeSaga } from './routeSaga';
import { STORE_ROUTE_DATA, fetchRouteData } from '../actions/route';

jest.mock('../../api', () => ({
  serverRouteData: jest.fn(() => [[11, 22], [33, 44]])
}));

describe('routeSaga', () => {
  describe('#FETCH_ROUTE_DATA', () => {
    it('fetches route data through api', async () => {
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