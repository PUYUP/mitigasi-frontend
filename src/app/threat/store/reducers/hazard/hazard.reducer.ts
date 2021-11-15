import { Action, createReducer, on } from '@ngrx/store';
import {
  createHazard,
  createHazardFailure,
  createHazardSuccess,
  deleteHazard,
  deleteHazardSuccess,
  loadHazard,
  loadHazardFailure,
  loadHazards,
  loadHazardsFailure,
  loadHazardsSuccess,
  loadHazardSuccess,
  loadMoreHazardsSuccess,
  resetHazard,
  scrapeHazards,
  scrapeHazardsSuccess,
  updateHazardSuccess,
} from '../../actions/hazard/hazard.actions';

export const hazardFeatureKey = 'hazard';

export interface HazardState {
  data: any;
  status: string;
}

export const initialState: HazardState = {
  data: {},
  status: 'initialize',
};

export const reducer = createReducer(
  initialState,

  // CREATE
  on(createHazard, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
      },
    };
  }),
  on(createHazardSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
        results: [payload.data, ...state.data.results],
      },
    };
  }),
  on(createHazardFailure, (state, payload) => {
    return {
      ...state,
      status: 'initialize',
    };
  }),

  // UPDATE
  on(updateHazardSuccess, (state, payload) => {
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
  on(deleteHazard, (state, payload) => {
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
  on(deleteHazardSuccess, (state, payload) => {
    let results = state.data.results;
    let newResults = results.filter((d: any) => {
      return d.uuid != payload.data.uuid;
    });

    return {
      ...state,
    };
  }),

  // LISTS
  on(loadHazards, (state, payload) => {
    return {
      ...state,
      status: 'loading',
      data: {
        results: [],
      },
    };
  }),
  on(loadHazardsSuccess, (state, payload) => {
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
  on(loadMoreHazardsSuccess, (state, payload) => {
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

  on(loadHazardsFailure, (state, error) => {
    return {
      ...state,
      status: 'initialize',
      data: {},
      error: error,
    };
  }),

  // SCRAPE
  on(scrapeHazards, (state, payload) => {
    return {
      ...state,
      is_scrapping: true,
      data: {
        ...state.data,
        scrape_results: [],
      },
    };
  }),
  on(scrapeHazardsSuccess, (state, payload) => {
    let results = state.data?.results?.length > 0 ? state.data.results : [];
    let scrape_results = payload.data?.scrape_results
      ? payload.data?.scrape_results
      : [];

    let mergeResults = [...scrape_results, ...results];

    return {
      ...state,
      is_scrapping: false,
      data: {
        ...state.data,
        results: mergeResults,
        scrape_results: scrape_results,
      },
    };
  }),

  // RETRIEVE
  on(loadHazard, (state, payload) => {
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
  on(loadHazardSuccess, (state, payload) => {
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
  }),
  on(loadHazardFailure, (state, payload) => {
    return {
      ...state,
      status: 'initialize',
      data: {
        ...state.data,
        result: {},
      },
    };
  }),

  // RESET
  on(resetHazard, (state, payload) => {
    return {
      ...state,
      status: 'initialize',
    };
  })
);

export function HazardReducer(state: HazardState | undefined, action: Action) {
  return reducer(state, action);
}
