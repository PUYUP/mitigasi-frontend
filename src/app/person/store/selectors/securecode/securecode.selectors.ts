import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';

export const state = createFeatureSelector<AppState>('person_securecode');

export const personSelectSecurecode = createSelector(
  state,
  (state: AppState) => state
);
