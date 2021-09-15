import { STORE_ADDRESSES_DATA } from '../actions/addresses';

const initialState = {
  addressesList: []
};

export function addresses (state = initialState, action) {
  switch (action.type) {
    case STORE_ADDRESSES_DATA: {
      const { addressesList } = action.payload;

      return { addressesList }
    }
    default:
      return state
  }
}

export const getAddressesList = state => state.addresses.addressesList;