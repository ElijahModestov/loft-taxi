import { STORE_ROUTE_DATA } from '../actions/route';

const initialState = {
  routeData: []
};

export function route (state = initialState, action) {
  switch (action.type) {
    case STORE_ROUTE_DATA: {
      const { routeData } = action.payload;

      return { routeData }
    }
    default:
      return state
  }
}

export const getRouteData = state => state.route.routeData;