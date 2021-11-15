import { createAction, props } from '@ngrx/store';

// CREATE
export const createComment = createAction(
  '[Comment] Create Comment',
  props<{ data: any }>()
);

export const createCommentSuccess = createAction(
  '[Comment] Create Comment Success',
  props<{ data: any }>()
);

export const createCommentFailure = createAction(
  '[Comment] Create Comment Failure',
  props<{ error: any }>()
);

// UPDATE
export const updateComment = createAction(
  '[Comment] Update Comment',
  props<{ uuid: string; data: any }>()
);

export const updateCommentSuccess = createAction(
  '[Comment] Update Comment Success',
  props<{ data: any }>()
);

export const updateCommentFailure = createAction(
  '[Comment] Update Comment Failure',
  props<{ error: any }>()
);

// DELETE
export const deleteComment = createAction(
  '[Comment] Delete Comment',
  props<{ uuid: string }>()
);

export const deleteCommentSuccess = createAction(
  '[Comment] Delete Comment Success',
  props<{ data: any }>()
);

export const deleteCommentFailure = createAction(
  '[Comment] Delete Comment Failure',
  props<{ error: any }>()
);

// LIST
export const loadComments = createAction(
  '[Comment] Load Comments',
  props<{ applied_uuid: string; applied_model: string; parent?: string }>()
);

export const loadCommentsSuccess = createAction(
  '[Comment] Load Comments Success',
  props<{ data: any }>()
);

export const loadMoreComments = createAction(
  '[Comment] Load More Comments',
  props<{
    next: string;
    applied_model: string;
    applied_uuid: string;
    parent?: string;
  }>()
);

export const loadMoreCommentsSuccess = createAction(
  '[Comment] Load More Comments Success',
  props<{ data: any }>()
);

export const loadCommentsFailure = createAction(
  '[Comment] Load Comments Failure',
  props<{ error: any }>()
);

// RETRIEVE
export const loadComment = createAction(
  '[Comment] Load Comment',
  props<{ uuid: string }>()
);

export const loadCommentSuccess = createAction(
  '[Comment] Load Comment Success',
  props<{ data: any }>()
);

export const loadCommentFailure = createAction(
  '[Comment] Load Comment Failure',
  props<{ error: any }>()
);
