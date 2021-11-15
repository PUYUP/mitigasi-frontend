import { createAction, props } from '@ngrx/store';

// CREATE
export const createHazard = createAction(
  '[Hazard] Create Hazard',
  props<{ data: any }>()
);

export const createHazardSuccess = createAction(
  '[Hazard] Create Hazard Success',
  props<{ data: any }>()
);

export const createHazardFailure = createAction(
  '[Hazard] Create Hazard Failure',
  props<{ error: any }>()
);

// UPDATE
export const updateHazard = createAction(
  '[Hazard] Update Hazard',
  props<{ uuid: string; data: any }>()
);

export const updateHazardSuccess = createAction(
  '[Hazard] Update Hazard Success',
  props<{ data: any }>()
);

export const updateHazardFailure = createAction(
  '[Hazard] Update Hazard Failure',
  props<{ error: any }>()
);

// DELETE
export const deleteHazard = createAction(
  '[Hazard] Delete Hazard',
  props<{ uuid: string }>()
);

export const deleteHazardSuccess = createAction(
  '[Hazard] Delete Hazard Success',
  props<{ data: any }>()
);

export const deleteHazardFailure = createAction(
  '[Hazard] Delete Hazard Failure',
  props<{ error: any }>()
);

// LISTS
export const loadHazards = createAction(
  '[Hazard] Load Hazards',
  props<{ classify?: string; user?: string }>()
);

export const loadHazardsSuccess = createAction(
  '[Hazard] Load Hazards Success',
  props<{ data: any }>()
);

export const loadMoreHazards = createAction(
  '[Hazard] Load More Hazards',
  props<{ next: string; classify?: string; user?: string }>()
);

export const loadMoreHazardsSuccess = createAction(
  '[Hazard] Load More Hazards Success',
  props<{ data: any }>()
);

export const loadHazardsFailure = createAction(
  '[Hazard] Load Hazards Failure',
  props<{ error: any }>()
);

// RETRIEVE
export const loadHazard = createAction(
  '[Hazard] Load Hazard',
  props<{ uuid: string }>()
);

export const loadHazardSuccess = createAction(
  '[Hazard] Load Hazard Success',
  props<{ data: any }>()
);

export const loadHazardFailure = createAction(
  '[Hazard] Load Hazard Failure',
  props<{ error: any }>()
);

// SCRAPE
export const scrapeHazards = createAction(
  '[Hazard] Scrape Hazards',
  props<{ classify?: string }>()
);

export const scrapeHazardsSuccess = createAction(
  '[Hazard] Scrape Hazards Success',
  props<{ data: any }>()
);

export const scrapeHazardsFailure = createAction(
  '[Hazard] Scrape Hazards Failure',
  props<{ error: any }>()
);

// RESET
export const resetHazard = createAction('[Hazard] Reset Hazard');
