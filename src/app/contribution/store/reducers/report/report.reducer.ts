import { Action, createReducer, on } from '@ngrx/store';
import {
  createReport,
  createReportSuccess,
  deleteReport,
  deleteReportSuccess,
  loadMoreReportsSuccess,
  loadReport,
  loadReports,
  loadReportsFailure,
  loadReportsSuccess,
  loadReportSuccess,
  updateReportSuccess,
} from '../../actions/report/report.actions';

export const reportFeatureKey = 'report';

export interface ReportState {
  status: string;
  data: any;
}

export const initialState: ReportState = {
  status: 'initialize',
  data: {},
};

export const reducer = createReducer(
  initialState,

  // CREATE
  on(createReport, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
      },
    };
  }),
  on(createReportSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
        results: [payload.data, ...state.data.results],
      },
    };
  }),

  // UPDATE
  on(updateReportSuccess, (state, payload) => {
    let results = state.data.results;
    let newResults = results.map((d: any) => {
      if (d.uuid == payload.data.uuid) {
        d = {
          ...payload.data,
        };
      }

      return d;
    });

    return {
      ...state,
      data: {
        ...state.data,
        results: newResults,
      },
    };
  }),

  // DELETE
  on(deleteReport, (state, payload) => {
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
  on(deleteReportSuccess, (state, payload) => {
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
  on(loadReports, (state, payload) => {
    return {
      ...state,
      status: 'loading',
      data: {
        results: [],
      },
    };
  }),
  on(loadReportsSuccess, (state, payload) => {
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
  on(loadMoreReportsSuccess, (state, payload) => {
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

  on(loadReportsFailure, (state, error) => {
    return {
      ...state,
      status: 'initialize',
      data: {},
      error: error,
    };
  }),

  // RETRIEVE
  on(loadReport, (state, payload) => {
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
  on(loadReportSuccess, (state, payload) => {
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

export function ReportReducer(state: ReportState | undefined, action: Action) {
  return reducer(state, action);
}
