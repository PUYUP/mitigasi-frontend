import { Action, createReducer, on } from '@ngrx/store';
import {
  deleteActivitySafetyCheck,
  deleteActivitySafetyCheckSuccess,
  loadActivitySafetyChecks,
  loadActivitySafetyChecksFailure,
  loadActivitySafetyChecksSuccess,
  loadMoreActivitySafetyChecksSuccess,
} from '../../actions/safetycheck/safetycheck.actions';

export const safetycheckFeatureKey = 'activity_safetycheck';

export interface ActivitySafetyCheckState {
  data: any;
  status: string;
}

export const initialState: ActivitySafetyCheckState = {
  data: {},
  status: 'initialize',
};

export const reducer = createReducer(
  initialState,

  // DELETE
  on(deleteActivitySafetyCheck, (state, payload) => {
    let results = state.data.results;
    let newResults = results.filter((d: any) => {
      return d.uuid != payload.uuid;
    });

    return {
      ...state,
      data: {
        ...state.data,
        results: newResults,
      },
    };
  }),
  on(deleteActivitySafetyCheckSuccess, (state, payload) => {
    let results = state.data.results;
    let newResults = results.filter((d: any) => {
      return d.uuid != payload.data.uuid;
    });

    return {
      ...state,
      data: {
        ...state.data,
        results: newResults,
      },
    };
  }),

  // LISTS
  on(loadActivitySafetyChecks, (state, payload) => {
    return {
      ...state,
      status: 'loading',
      data: {
        results: [],
      },
    };
  }),
  on(loadActivitySafetyChecksSuccess, (state, payload) => {
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
  on(loadMoreActivitySafetyChecksSuccess, (state, payload) => {
    let results = state.data?.results ? state.data?.results : [];
    let mergeResults = [...results, ...payload.data.results];

    return {
      ...state,
      data: {
        ...state.data,
        next: payload?.data?.next,
        previous: payload?.data?.previous,
        results: mergeResults,
      },
    };
  }),

  on(loadActivitySafetyChecksFailure, (state, error) => {
    return {
      ...state,
      status: 'initialize',
      data: {},
      error: error,
    };
  })
);

export function ActivitySafetyCheckReducer(
  state: ActivitySafetyCheckState | undefined,
  action: Action
) {
  return reducer(state, action);
}
