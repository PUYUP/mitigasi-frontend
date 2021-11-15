import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';

export const state = createFeatureSelector<AppState>('comment');

export const selectComments = createSelector(state, (state: AppState) => {
  return state;
});

export const selectComment = (props: any) =>
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
