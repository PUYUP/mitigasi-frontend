import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';

export const state = createFeatureSelector<AppState>('hazard_map');

export const selectHazardMaps = createSelector(state, (state: AppState) => {
  return state;
});

export const selectHazardMap = (props: any) =>
  createSelector(state, (state: any) => {
    let ret = {};
    let result = state?.data?.result;

    if (result) {
      ret = result;
    } else {
      ret = state?.data?.results?.find((d: any) => d.uuid == props?.uuid);
    }

    return {
      ...state,
      data: {
        ...state.data,
        result: ret,
      },
    };
  });
