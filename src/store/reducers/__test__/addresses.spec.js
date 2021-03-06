import React from 'react';
import { addresses } from '../addresses';
import { storeAddressesData } from '../../actions/addresses';

const initialState = {
  addressesList: []
}

describe('addressesReducer', () => {
  it('returns the initial state', () => {
    expect(addresses(initialState, {})).toEqual(initialState);
  });
  it('stores addresses list', () => {
    expect(addresses(initialState, storeAddressesData(['test_address_1', 'test_address_2'])))
      .toEqual({ addressesList: ['test_address_1', 'test_address_2'] });
  });
});