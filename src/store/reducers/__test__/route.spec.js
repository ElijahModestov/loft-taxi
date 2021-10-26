import React from 'react';
import { route } from '../route';
import { storeRouteData } from '../../actions/route';

const initialState = {
  routeData: []
}

describe('routeReducer', () => {
  it('returns the initial state', () => {
    expect(route(initialState, {})).toEqual(initialState);
  });
  it('stores route data', () => {
    expect(route(initialState, storeRouteData([[11, 22], [33, 44]])))
      .toEqual({ routeData: [[11, 22], [33, 44]] });
  });
});