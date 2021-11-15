import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';

export const state = createFeatureSelector<AppState>('person_user');

export const personSelectUser = createSelector(state, (state: AppState) => {
  return state;
});

export const personRetrieveUser = (hexid: string) =>
  createSelector(state, (state: any) => {
    return {
      user: state?.user,
      status: state?.status,
    };
  });
