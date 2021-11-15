import { createAction, props } from '@ngrx/store';

export const loadSafetyCheckMaps = createAction(
  '[SafetyCheckMap] Load SafetyCheckMaps',
  props<{ condition?: string; content_type: string; object_id: string }>()
);

export const loadSafetyCheckMapsSuccess = createAction(
  '[SafetyCheckMap] Load SafetyCheckMaps Success',
  props<{ data: any }>()
);

export const loadSafetyCheckMapsFailure = createAction(
  '[SafetyCheckMap] Load SafetyCheckMaps Failure',
  props<{ error: any }>()
);

export const resetSafetyCheckMaps = createAction(
  '[SafetyCheckMap] Reset SafetyCheckMaps Failure'
);
