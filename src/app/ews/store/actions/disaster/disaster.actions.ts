import { createAction, props } from '@ngrx/store';

// LISTS
export const loadDisasters = createAction(
  '[Disaster] Load Disasters',
  props<{ identifier: string }>()
);

export const loadDisastersSuccess = createAction(
  '[Disaster] Load Disasters Success',
  props<{ data: any }>()
);

export const loadMoreDisasters = createAction(
  '[Disaster] Load More Disasters',
  props<{ next: string; identifier: string }>()
);

export const loadMoreDisastersSuccess = createAction(
  '[Disaster] Load More Disasters Success',
  props<{ data: any }>()
);

export const loadDisastersFailure = createAction(
  '[Disaster] Load Disasters Failure',
  props<{ error: any }>()
);

// RETRIEVE
export const loadDisaster = createAction(
  '[Disaster] Load Disaster',
  props<{ uuid: string }>()
);

export const loadDisasterSuccess = createAction(
  '[Disaster] Load Disaster Success',
  props<{ data: any }>()
);

export const loadDisasterFailure = createAction(
  '[Disaster] Load Disaster Failure',
  props<{ error: any }>()
);

// SCRAPE
export const scrapeDisasters = createAction(
  '[Disaster] Scrape Disasters',
  props<{ identifier: string }>()
);

export const scrapeDisastersSuccess = createAction(
  '[Disaster] Scrape Disasters Success',
  props<{ data: any }>()
);

export const scrapeDisastersFailure = createAction(
  '[Disaster] Scrape Disasters Failure',
  props<{ error: any }>()
);
