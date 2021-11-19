import { createAction, props } from '@ngrx/store';

// DELETE
export const deleteActivityComment = createAction(
  '[ActivityComment] Delete ActivityComment',
  props<{ uuid: string }>()
);

export const deleteActivityCommentSuccess = createAction(
  '[ActivityComment] Delete ActivityComment Success',
  props<{ data: any }>()
);

export const deleteActivityCommentFailure = createAction(
  '[ActivityComment] Delete ActivityComment Failure',
  props<{ error: any }>()
);

// LISTS
export const loadActivityComments = createAction(
  '[ActivityComment] Load ActivityComments',
  props<{ content_type: string; object_id?: string; user_id?: string }>()
);

export const loadActivityCommentsSuccess = createAction(
  '[ActivityComment] Load ActivityComments Success',
  props<{ data: any }>()
);

export const loadMoreActivityComments = createAction(
  '[ActivityComment] Load More ActivityComments',
  props<{
    next: string;
    content_type: string;
    object_id?: string;
    user_id?: string;
  }>()
);

export const loadMoreActivityCommentsSuccess = createAction(
  '[ActivityComment] Load More ActivityComments Success',
  props<{ data: any }>()
);

export const loadActivityCommentsFailure = createAction(
  '[ActivityComment] Load ActivityComments Failure',
  props<{ error: any }>()
);
