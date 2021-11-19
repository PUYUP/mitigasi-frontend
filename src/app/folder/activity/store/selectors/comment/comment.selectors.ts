import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';

export const state = createFeatureSelector<AppState>('activity_comment');

export const selectActivityComments = createSelector(
  state,
  (state: AppState) => {
    return state;
  }
);

export const selectScrappingActivityComments = createSelector(
  state,
  (state: any) => {
    return state;
  }
);

export const selectActivityComment = (props: any) =>
  createSelector(state, (state: any) => {
    let ret = {};
    let result = state?.data?.result;

    if (result) {
      ret = result;
    } else {
      ret = state?.data?.results?.find(
        (d: any) => d.uuid == props?.comment_uuid
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
