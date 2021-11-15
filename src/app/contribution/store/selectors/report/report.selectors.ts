import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';

export const state = createFeatureSelector<AppState>('report');

export const selectReports = createSelector(state, (state: AppState) => {
  return state;
});

export const selectReport = (props: any) =>
  createSelector(state, (state: any) => {
    let ret = {};
    let result = state?.data?.result;

    if (result) {
      ret = result;
    } else {
      ret = state?.data?.results?.find(
        (d: any) => d.uuid == props?.report_uuid
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
