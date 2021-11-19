import { Action, createReducer, on } from '@ngrx/store';
import {
  deleteActivityComment,
  deleteActivityCommentSuccess,
  loadActivityComments,
  loadActivityCommentsFailure,
  loadActivityCommentsSuccess,
  loadMoreActivityCommentsSuccess,
} from '../../actions/comment/comment.actions';

export const CommentFeatureKey = 'activity_comment';

export interface ActivityCommentState {
  data: any;
  status: string;
}

export const initialState: ActivityCommentState = {
  data: {},
  status: 'initialize',
};

export const reducer = createReducer(
  initialState,

  // DELETE
  on(deleteActivityComment, (state, payload) => {
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
  on(deleteActivityCommentSuccess, (state, payload) => {
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
  on(loadActivityComments, (state, payload) => {
    return {
      ...state,
      status: 'loading',
      data: {
        results: [],
      },
    };
  }),
  on(loadActivityCommentsSuccess, (state, payload) => {
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
  on(loadMoreActivityCommentsSuccess, (state, payload) => {
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

  on(loadActivityCommentsFailure, (state, error) => {
    return {
      ...state,
      status: 'initialize',
      data: {},
      error: error,
    };
  })
);

export function ActivityCommentReducer(
  state: ActivityCommentState | undefined,
  action: Action
) {
  return reducer(state, action);
}
