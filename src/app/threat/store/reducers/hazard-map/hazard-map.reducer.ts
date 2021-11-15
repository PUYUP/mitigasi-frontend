import { Action, createReducer, on } from '@ngrx/store';
import {
  loadHazardMaps,
  loadHazardMapsFailure,
  loadHazardMapsSuccess,
} from '../../actions/hazard-map/hazard-map.actions';

export const hazardMapFeatureKey = 'hazard_map';

export interface HazardMapState {
  data: any;
  status: string;
}

export const initialState: HazardMapState = {
  data: {},
  status: 'initialize',
};

export const reducer = createReducer(
  initialState,

  // LISTS
  on(loadHazardMaps, (state, payload) => {
    return {
      ...state,
      status: 'loading',
      data: {
        results: [],
      },
    };
  }),
  on(loadHazardMapsSuccess, (state, payload) => {
    let results = payload.data?.results;

    return {
      ...state,
      status: 'loaded',
      data: {
        ...payload.data,
        results: results,
      },
    };
  }),

  on(loadHazardMapsFailure, (state, error) => {
    return {
      ...state,
      status: 'initialize',
      data: {},
      error: error,
    };
  })
);

export function HazardMapReducer(
  state: HazardMapState | undefined,
  action: Action
) {
  return reducer(state, action);
}
