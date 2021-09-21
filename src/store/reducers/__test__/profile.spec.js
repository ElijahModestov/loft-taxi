import React from 'react';
import { profile } from '../profile';
import { storePaymentData, storePaymentError } from '../../actions/profile';

const initialState = {
  hasEligiblePayment: false,
  cardName: '',
  cardNumber: '',
  expiryDate: '',
  cvc: '',
  error: ''
};
const filledState = {
  hasEligiblePayment: true,
  cardName: 'test_card_name',
  cardNumber: 'test_card_number',
  expiryDate: 'test_expiry_date',
  cvc: 'test_cvc',
  error: ''
};

describe('authReducer', () => {
  it('returns the initial state', () => {
    expect(profile(initialState, {})).toEqual(initialState);
  });
  it('stores login data on login', () => {
    expect(profile(initialState, storePaymentData('test_card_name',
      'test_card_number', 'test_expiry_date',
      'test_cvc')))
      .toEqual(filledState);
  });
  it('stores error', () => {
    expect(profile(initialState, storePaymentError('test_error')))
      .toEqual({
        ...initialState,
        error: 'test_error'
      });
  });
});