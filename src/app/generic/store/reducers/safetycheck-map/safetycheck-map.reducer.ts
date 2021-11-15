import { Action, createReducer, on } from '@ngrx/store';
import {
  loadSafetyCheckMaps,
  loadSafetyCheckMapsFailure,
  loadSafetyCheckMapsSuccess,
  resetSafetyCheckMaps,
} from '../../actions/safetycheck-map/safetycheck-map.actions';

export const safetyCheckMapFeatureKey = 'safetycheck_map';

export interface SafetyCheckMapState {
  data: any;
  status: string;
}

export const initialState: SafetyCheckMapState = {
  data: {},
  status: 'initialize',
};

export const reducer = createReducer(
  initialState,

  // LISTS
  on(loadSafetyCheckMaps, (state, payload) => {
    return {
      ...state,
      status: 'loading',
      data: {
        results: [],
      },
    };
  }),
  on(loadSafetyCheckMapsSuccess, (state, payload) => {
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

  on(loadSafetyCheckMapsFailure, (state, error) => {
    return {
      ...state,
      status: 'initialize',
      data: {},
      error: error,
    };
  }),

  // RESET
  on(resetSafetyCheckMaps, () => {
    return {
      data: {},
      error: null,
      status: 'initialize',
    };
  })
);

export function SafetyCheckMapReducer(
  state: SafetyCheckMapState | undefined,
  action: Action
) {
  return reducer(state, action);
}
