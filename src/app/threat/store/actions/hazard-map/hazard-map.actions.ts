import { createAction, props } from '@ngrx/store';

export const loadHazardMaps = createAction(
  '[HazardMap] Load HazardMaps',
  props<{ classify?: string; startdate?: string }>()
);

export const loadHazardMapsSuccess = createAction(
  '[HazardMap] Load HazardMaps Success',
  props<{ data: any }>()
);

export const loadHazardMapsFailure = createAction(
  '[HazardMap] Load HazardMaps Failure',
  props<{ error: any }>()
);
