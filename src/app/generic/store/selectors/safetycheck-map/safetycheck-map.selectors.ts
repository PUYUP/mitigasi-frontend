import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';

export const state = createFeatureSelector<AppState>('safetycheck_map');

export const selectSafetyCheckMaps = createSelector(
  state,
  (state: AppState) => {
    return state;
  }
);

export const selectSafetyCheckMap = (props: any) =>
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
