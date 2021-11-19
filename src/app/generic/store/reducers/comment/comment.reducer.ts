import { Action, createReducer, on } from '@ngrx/store';
import {
  createComment,
  createCommentSuccess,
  deleteComment,
  deleteCommentSuccess,
  loadMoreCommentsSuccess,
  loadComment,
  loadComments,
  loadCommentsFailure,
  loadCommentsSuccess,
  loadCommentSuccess,
  updateCommentSuccess,
} from '../../actions/comment/comment.actions';

export const commentFeatureKey = 'generic_comment';

export interface CommentState {
  status: string;
  data: any;
}

export const initialState: CommentState = {
  status: 'initialize',
  data: {},
};

export const reducer = createReducer(
  initialState,

  // CREATE
  on(createComment, (state, payload) => {
    return {
      ...state,
      status: 'creating',
      data: {
        ...state.data,
      },
    };
  }),
  on(createCommentSuccess, (state, payload) => {
    let results = state.data?.results ? state.data.results : [];

    return {
      ...state,
      status: 'loaded',
      data: {
        ...state.data,
        results: [...results, payload.data],
      },
    };
  }),

  // UPDATE
  on(updateCommentSuccess, (state, payload) => {
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
  on(deleteComment, (state, payload) => {
    return {
      ...state,
    };
  }),
  on(deleteCommentSuccess, (state, payload) => {
    let results = state.data.results;
    let newResults = results.filter((d: any) => {
      return d.uuid != payload.data.uuid;
    });

    return {
      ...state,
      data: {
        result: {
          ...state.data?.result,
        },
        results: newResults,
      },
    };
  }),

  // LISTS
  on(loadComments, (state, payload) => {
    return {
      ...state,
      status: 'loading',
      data: {
        result: {
          ...state.data?.result,
        },
        results: [],
      },
    };
  }),
  on(loadCommentsSuccess, (state, payload) => {
    let results = payload.data?.results;

    return {
      ...state,
      status: 'loaded',
      data: {
        ...payload.data,
        result: {
          ...state.data?.result,
        },
        results: results,
      },
    };
  }),
  on(loadMoreCommentsSuccess, (state, payload) => {
    let results = state.data.results;
    let mergeResults = [...payload.data.results, ...results];

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

  on(loadCommentsFailure, (state, error) => {
    return {
      ...state,
      status: 'initialize',
      data: {},
      error: error,
    };
  }),

  // RETRIEVE
  on(loadComment, (state, payload) => {
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
  on(loadCommentSuccess, (state, payload) => {
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

export function CommentReducer(
  state: CommentState | undefined,
  action: Action
) {
  return reducer(state, action);
}
