export const FETCH_ROUTE_DATA = 'FETCH_ROUTE_DATA';
export const STORE_ROUTE_DATA = 'STORE_ROUTE_DATA';

export const fetchRouteData = (address1, address2) => ({
  type: FETCH_ROUTE_DATA,
  payload: { address1, address2 }
});
export const storeRouteData = (routeData) => ({
  type: STORE_ROUTE_DATA,
  payload: { routeData }
});