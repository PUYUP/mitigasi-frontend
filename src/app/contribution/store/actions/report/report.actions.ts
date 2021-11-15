import { createAction, props } from '@ngrx/store';

// CREATE
export const createReport = createAction(
  '[Report] Create Report',
  props<{ data: any }>()
);

export const createReportSuccess = createAction(
  '[Report] Create Report Success',
  props<{ data: any }>()
);

export const createReportFailure = createAction(
  '[Report] Create Report Failure',
  props<{ error: any }>()
);

// UPDATE
export const updateReport = createAction(
  '[Report] Update Report',
  props<{ uuid: string; data: any }>()
);

export const updateReportSuccess = createAction(
  '[Report] Update Report Success',
  props<{ data: any }>()
);

export const updateReportFailure = createAction(
  '[Report] Update Report Failure',
  props<{ error: any }>()
);

// DELETE
export const deleteReport = createAction(
  '[Report] Delete Report',
  props<{ uuid: string }>()
);

export const deleteReportSuccess = createAction(
  '[Report] Delete Report Success',
  props<{ data: any }>()
);

export const deleteReportFailure = createAction(
  '[Report] Delete Report Failure',
  props<{ error: any }>()
);

// LIST
export const loadReports = createAction(
  '[Report] Load Reports',
  props<{ identifier: string }>()
);

export const loadReportsSuccess = createAction(
  '[Report] Load Reports Success',
  props<{ data: any }>()
);

export const loadMoreReports = createAction(
  '[Report] Load More Reports',
  props<{ next: string; identifier: string }>()
);

export const loadMoreReportsSuccess = createAction(
  '[Report] Load More Reports Success',
  props<{ data: any }>()
);

export const loadReportsFailure = createAction(
  '[Report] Load Reports Failure',
  props<{ error: any }>()
);

// RETRIEVE
export const loadReport = createAction(
  '[Report] Load Report',
  props<{ uuid: string }>()
);

export const loadReportSuccess = createAction(
  '[Report] Load Report Success',
  props<{ data: any }>()
);

export const loadReportFailure = createAction(
  '[Report] Load Report Failure',
  props<{ error: any }>()
);
