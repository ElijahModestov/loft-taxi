import React from 'react';
import { auth } from '../auth';
import { login, logout, storeAuthError } from '../../actions/auth';
import { cacheObject, getCachedObject, removeCachedObject } from '../../../caching';

const initialState = {
  isLoggedIn: false,
  email: '',
  password: '',
  name: '',
  surname: '',
  token: '',
  error: ''
};
const filledState = {
  isLoggedIn: true,
  email: 'test_email',
  password: 'test_password',
  name: 'test_name',
  surname: 'test_surname',
  token: 'test_token',
  error: ''
};

describe('authReducer', () => {
  it('returns the initial state', () => {
    expect(auth(initialState, {})).toEqual(initialState);
  });
  it('stores login data on login', () => {
    expect(auth(initialState, login('test_email', 'test_password',
      'test_token', 'test_name', 'test_surname')))
      .toEqual(filledState);

    expect(getCachedObject('auth')).toEqual({
      isLoggedIn: true,
      email: 'test_email',
      token: 'test_token',
      name: 'test_name',
      surname: 'test_surname'
    });
  });
  it('restores initial state on logout', () => {
    cacheObject(filledState);

    expect(auth(filledState, logout()))
      .toEqual(initialState);
    expect(getCachedObject('auth')).toBe(null);
  });
  it('stores error', () => {
    expect(auth(initialState, storeAuthError('test_error')))
      .toEqual({
        ...initialState,
        error: 'test_error'
      });
  });
});