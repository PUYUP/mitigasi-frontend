import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';

export const state = createFeatureSelector<AppState>('person_password');

export const personSelectPassword = createSelector(
  state,
  (state: AppState) => state
);
