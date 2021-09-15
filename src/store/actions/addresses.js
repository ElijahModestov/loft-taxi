export const FETCH_ADDRESSES_DATA = 'FETCH_ADDRESSES_DATA';
export const STORE_ADDRESSES_DATA = 'STORE_ADDRESSES_DATA';

export const fetchAddressesData = () => ({
  type: FETCH_ADDRESSES_DATA
});
export const storeAddressesData = (addressesList) => ({
  type: STORE_ADDRESSES_DATA,
  payload: { addressesList }
});