import { Action, createReducer, on } from '@ngrx/store';
import {
  createSecurecode,
  createSecurecodeSuccess,
  createSecurecodeFailure,
  validateSecurecode,
  validateSecurecodeSuccess,
  validateSecurecodeFailure,
  resetSecurecode,
} from '../../actions/securecode/securecode.actions';

export const PersonSecurecodeFeatureKey = 'person_securecode';

export interface PersonSecurecodeState {
  data: any;
  error: any;
  status: string;
  resend?: boolean;
}

export const initialState: PersonSecurecodeState = {
  data: {},
  error: null,
  status: 'init',
  resend: false,
};

export const reducer = createReducer(
  initialState,

  // CREATE
  on(createSecurecode, (state, payload) => {
    return {
      ...state,
      status: 'loading',
      error: null,
      resend: payload?.resend || false,
    };
  }),
  on(createSecurecodeSuccess, (state, payload) => {
    return {
      ...state,
      data: { ...payload.data },
      status: 'loaded',
      error: null,
    };
  }),
  on(createSecurecodeFailure, (state, payload) => {
    return {
      ...state,
      data: {},
      status: 'init',
      error: payload.error,
    };
  }),

  // VALIDATE
  on(validateSecurecode, (state, payload) => {
    return {
      ...state,
      status: 'loading',
      error: null,
    };
  }),
  on(validateSecurecodeSuccess, (state, payload) => {
    return {
      ...state,
      data: { ...payload.data },
      status: 'loaded',
      error: null,
    };
  }),
  on(validateSecurecodeFailure, (state, payload) => {
    return {
      ...state,
      data: {},
      status: 'init',
      error: payload.error,
    };
  }),

  // RESET
  on(resetSecurecode, () => {
    return {
      data: {},
      error: null,
      status: 'init',
      resend: false,
    };
  })
);

export function PersonSecurecodeReducer(
  state: PersonSecurecodeState | undefined,
  action: Action
) {
  return reducer(state, action);
}
