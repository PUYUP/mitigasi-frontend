import { createAction, props } from '@ngrx/store';

// CREATE
export const createSafetyCheck = createAction(
  '[SafetyCheck] Create SafetyCheck',
  props<{ data: any }>()
);

export const createSafetyCheckSuccess = createAction(
  '[SafetyCheck] Create SafetyCheck Success',
  props<{ data: any }>()
);

export const createSafetyCheckFailure = createAction(
  '[SafetyCheck] Create SafetyCheck Failure',
  props<{ error: any }>()
);

// UPDATE
export const updateSafetyCheck = createAction(
  '[SafetyCheck] Update SafetyCheck',
  props<{ uuid: string; data: any }>()
);

export const updateSafetyCheckSuccess = createAction(
  '[SafetyCheck] Update SafetyCheck Success',
  props<{ data: any }>()
);

export const updateSafetyCheckFailure = createAction(
  '[SafetyCheck] Update SafetyCheck Failure',
  props<{ error: any }>()
);

// DELETE
export const deleteSafetyCheck = createAction(
  '[SafetyCheck] Delete SafetyCheck',
  props<{ uuid: string }>()
);

export const deleteSafetyCheckSuccess = createAction(
  '[SafetyCheck] Delete SafetyCheck Success',
  props<{ data: any }>()
);

export const deleteSafetyCheckFailure = createAction(
  '[SafetyCheck] Delete SafetyCheck Failure',
  props<{ error: any }>()
);

// LISTS
export const loadSafetyChecks = createAction(
  '[SafetyCheck] Load SafetyChecks',
  props<{ content_type: string; object_id?: string; user_id?: string }>()
);

export const loadSafetyChecksSuccess = createAction(
  '[SafetyCheck] Load SafetyChecks Success',
  props<{ data: any }>()
);

export const loadMoreSafetyChecks = createAction(
  '[SafetyCheck] Load More SafetyChecks',
  props<{
    next: string;
    content_type: string;
    object_id?: string;
    user_id?: string;
  }>()
);

export const loadMoreSafetyChecksSuccess = createAction(
  '[SafetyCheck] Load More SafetyChecks Success',
  props<{ data: any }>()
);

export const loadSafetyChecksFailure = createAction(
  '[SafetyCheck] Load SafetyChecks Failure',
  props<{ error: any }>()
);

// RETRIEVE
export const loadSafetyCheck = createAction(
  '[SafetyCheck] Load SafetyCheck',
  props<{ uuid: string }>()
);

export const loadSafetyCheckSuccess = createAction(
  '[SafetyCheck] Load SafetyCheck Success',
  props<{ data: any }>()
);

export const loadSafetyCheckFailure = createAction(
  '[SafetyCheck] Load SafetyCheck Failure',
  props<{ error: any }>()
);
