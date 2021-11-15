import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';

export const state = createFeatureSelector<AppState>('activity_safetycheck');

export const selectActivitySafetyChecks = createSelector(
  state,
  (state: AppState) => {
    return state;
  }
);

export const selectScrappingActivitySafetyChecks = createSelector(
  state,
  (state: any) => {
    return state;
  }
);

export const selectActivitySafetyCheck = (props: any) =>
  createSelector(state, (state: any) => {
    let ret = {};
    let result = state?.data?.result;

    if (result) {
      ret = result;
    } else {
      ret = state?.data?.results?.find(
        (d: any) => d.uuid == props?.safetycheck_uuid
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
