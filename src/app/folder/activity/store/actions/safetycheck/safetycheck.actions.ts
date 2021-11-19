import { createAction, props } from '@ngrx/store';

// DELETE
export const deleteActivitySafetyCheck = createAction(
  '[ActivitySafetyCheck] Delete ActivitySafetyCheck',
  props<{ uuid: string }>()
);

export const deleteActivitySafetyCheckSuccess = createAction(
  '[ActivitySafetyCheck] Delete ActivitySafetyCheck Success',
  props<{ data: any }>()
);

export const deleteActivitySafetyCheckFailure = createAction(
  '[ActivitySafetyCheck] Delete ActivitySafetyCheck Failure',
  props<{ error: any }>()
);

// LISTS
export const loadActivitySafetyChecks = createAction(
  '[ActivitySafetyCheck] Load ActivitySafetyChecks',
  props<{ content_type: string; object_id?: string; user_id?: string }>()
);

export const loadActivitySafetyChecksSuccess = createAction(
  '[ActivitySafetyCheck] Load ActivitySafetyChecks Success',
  props<{ data: any }>()
);

export const loadMoreActivitySafetyChecks = createAction(
  '[ActivitySafetyCheck] Load More ActivitySafetyChecks',
  props<{
    next: string;
    content_type: string;
    object_id?: string;
    user_id?: string;
  }>()
);

export const loadMoreActivitySafetyChecksSuccess = createAction(
  '[ActivitySafetyCheck] Load More ActivitySafetyChecks Success',
  props<{ data: any }>()
);

export const loadActivitySafetyChecksFailure = createAction(
  '[ActivitySafetyCheck] Load ActivitySafetyChecks Failure',
  props<{ error: any }>()
);
