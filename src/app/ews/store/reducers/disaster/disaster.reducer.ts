import { Action, createReducer, on } from '@ngrx/store';
import {
  loadDisaster,
  loadDisasters,
  loadDisastersFailure,
  loadDisastersSuccess,
  loadDisasterSuccess,
  loadMoreDisastersSuccess,
  scrapeDisasters,
  scrapeDisastersSuccess,
} from '../../actions/disaster/disaster.actions';

export const disasterFeatureKey = 'disaster';

export interface DisasterState {
  data: any;
  status: string;
}

export const initialState: DisasterState = {
  data: {},
  status: 'initialize',
};

export const reducer = createReducer(
  initialState,

  // LISTS
  on(loadDisasters, (state, payload) => {
    return {
      ...state,
      status: 'loading',
      data: {
        results: [],
      },
    };
  }),
  on(loadDisastersSuccess, (state, payload) => {
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
  on(loadMoreDisastersSuccess, (state, payload) => {
    let results = state.data.results;
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

  on(loadDisastersFailure, (state, error) => {
    return {
      ...state,
      status: 'initialize',
      data: {},
      error: error,
    };
  }),

  // SCRAPE
  on(scrapeDisasters, (state, payload) => {
    return {
      ...state,
      is_scrapping: true,
      data: {
        ...state.data,
        scrape_results: [],
      },
    };
  }),
  on(scrapeDisastersSuccess, (state, payload) => {
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
  on(loadDisaster, (state, payload) => {
    let result = state?.data?.results?.find((d: any) => {
      return d.uuid == payload.uuid;
    });

    return {
      ...state,
      data: {
        ...state.data,
        result: result,
      },
    };
  }),
  on(loadDisasterSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
        result: {
          ...payload?.data,
        },
      },
    };
  })
);

export function DisasterReducer(
  state: DisasterState | undefined,
  action: Action
) {
  return reducer(state, action);
}
