import { Action, createReducer, on } from '@ngrx/store';
import {
  recoveryPassword,
  recoveryPasswordFailure,
  recoveryPasswordSuccess,
} from '../../actions/password/password.actions';

export const passwordFeatureKey = 'person_password';

export interface PersonPasswordState {
  data: any;
  error: any;
  status: string;
}

export const initialState: PersonPasswordState = {
  data: {},
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  on(recoveryPassword, (state) => {
    return {
      ...state,
      status: 'loading',
      error: null,
    };
  }),
  on(recoveryPasswordSuccess, (state, payload) => {
    return {
      ...state,
      data: { ...payload.data },
      status: 'loaded',
      error: null,
    };
  }),
  on(recoveryPasswordFailure, (state, payload) => {
    return {
      ...state,
      data: {},
      status: 'init',
      error: payload.error,
    };
  })
);

export function PersonPasswordReducer(
  state: PersonPasswordState | undefined,
  action: Action
) {
  return reducer(state, action);
}
