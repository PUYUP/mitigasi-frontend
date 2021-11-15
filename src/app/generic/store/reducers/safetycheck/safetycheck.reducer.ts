import { Action, createReducer, on } from '@ngrx/store';
import {
  createSafetyCheck,
  createSafetyCheckSuccess,
  deleteSafetyCheck,
  deleteSafetyCheckSuccess,
  loadSafetyCheck,
  loadSafetyChecks,
  loadSafetyChecksFailure,
  loadSafetyChecksSuccess,
  loadSafetyCheckSuccess,
  loadMoreSafetyChecksSuccess,
  updateSafetyCheckSuccess,
} from '../../actions/safetycheck/safetycheck.actions';

export const safetycheckFeatureKey = 'safetycheck';

export interface SafetyCheckState {
  data: any;
  status: string;
}

export const initialState: SafetyCheckState = {
  data: {},
  status: 'initialize',
};

export const reducer = createReducer(
  initialState,

  // CREATE
  on(createSafetyCheck, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
      },
    };
  }),
  on(createSafetyCheckSuccess, (state, payload) => {
    let results = state.data?.results ? state.data.results : [];

    return {
      ...state,
      data: {
        ...state.data,
        results: [payload.data, ...results],
      },
    };
  }),

  // UPDATE
  on(updateSafetyCheckSuccess, (state, payload) => {
    let results = state.data.results;
    let newResults = results;

    if (results?.length > 0) {
      newResults = results.map((d: any) => {
        if (d.uuid == payload.data.uuid) {
          d = {
            ...payload.data,
          };
        }

        return d;
      });
    }

    return {
      ...state,
      data: {
        ...state.data,
        results: newResults,
        result: payload.data,
      },
    };
  }),

  // DELETE
  on(deleteSafetyCheck, (state, payload) => {
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
  on(deleteSafetyCheckSuccess, (state, payload) => {
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
  on(loadSafetyChecks, (state, payload) => {
    return {
      ...state,
      status: 'loading',
      data: {
        results: [],
      },
    };
  }),
  on(loadSafetyChecksSuccess, (state, payload) => {
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
  on(loadMoreSafetyChecksSuccess, (state, payload) => {
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

  on(loadSafetyChecksFailure, (state, error) => {
    return {
      ...state,
      status: 'initialize',
      data: {},
      error: error,
    };
  }),

  // RETRIEVE
  on(loadSafetyCheck, (state, payload) => {
    let result = state?.data?.results?.find((d: any) => {
      return d.uuid == payload.uuid;
    });

    return {
      ...state,
      status: 'loading',
      data: {
        ...state.data,
        result: result,
      },
    };
  }),
  on(loadSafetyCheckSuccess, (state, payload) => {
    return {
      ...state,
      status: 'loaded',
      data: {
        ...state.data,
        result: {
          ...payload?.data,
        },
      },
    };
  })
);

export function SafetyCheckReducer(
  state: SafetyCheckState | undefined,
  action: Action
) {
  return reducer(state, action);
}
