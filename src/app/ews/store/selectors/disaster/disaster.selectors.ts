import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';

export const state = createFeatureSelector<AppState>('disaster');

export const selectDisasters = createSelector(state, (state: AppState) => {
  return state;
});

export const selectScrappingDisasters = createSelector(state, (state: any) => {
  return state;
});

export const selectDisaster = (props: any) =>
  createSelector(state, (state: any) => {
    let ret = {};
    let result = state?.data?.result;

    if (result) {
      ret = result;
    } else {
      ret = state?.data?.results?.find(
        (d: any) => d.uuid == props?.disaster_uuid
      );
    }

    return {
      ...state,
      data: {
        ...state.data,
        result: ret,
      },
    };
  });
