import { Action, createReducer, on } from '@ngrx/store';
import {
  signupUser,
  signupUserSuccess,
  signupUserFailure,
  signinUser,
  signinUserSuccess,
  signinUserFailure,
  getUserFromCookieSuccess,
  getUserFromCookie,
  signoutUser,
  signoutUserSuccess,
  updateProfile,
  updateProfileSuccess,
  updateProfileFailure,
  changePassword,
  changePasswordSuccess,
  changePasswordFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  retrieveUser,
  retrieveUserSuccess,
  retrieveUserFailure,
} from '../../actions/user/user.actions';

export const userFeatureKey = 'person_user';

export interface PersonUserState {
  data: any;
  // for retrieve user
  user: any;
  error: any;
  status: string;
}

export const initialState: PersonUserState = {
  data: {},
  // for retrieve user
  user: {},
  error: null,
  status: 'init',
};

export const reducer = createReducer(
  initialState,

  // SIGNUP
  on(signupUser, (state) => {
    return {
      ...state,
      status: 'loading',
      error: null,
    };
  }),
  on(signupUserSuccess, (state, payload) => {
    return {
      ...state,
      data: { ...payload.data },
      status: 'loaded',
      error: null,
    };
  }),
  on(signupUserFailure, (state, payload) => {
    return {
      ...state,
      data: {},
      status: 'init',
      error: payload.error,
    };
  }),

  // SIGNIN
  on(signinUser, (state) => {
    return {
      ...state,
      status: 'loading',
      error: null,
    };
  }),
  on(signinUserSuccess, (state, payload) => {
    return {
      ...state,
      data: { ...payload.data },
      status: 'loaded',
      error: null,
    };
  }),
  on(signinUserFailure, (state, payload) => {
    return {
      ...state,
      data: {},
      status: 'init',
      error: payload.error,
    };
  }),

  // SIGNOUT
  on(signoutUser, (state) => {
    return {
      ...state,
      status: 'loading',
      error: null,
    };
  }),
  on(signoutUserSuccess, (state, payload) => {
    return {
      ...state,
      data: {},
      status: 'loaded',
      error: null,
    };
  }),

  // GET FROM COOKIE
  on(getUserFromCookie, (state) => {
    return {
      ...state,
      status: 'loading',
      error: null,
    };
  }),
  on(getUserFromCookieSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
        ...payload.data,
      },
      status: 'loaded',
      error: null,
    };
  }),

  // UPDATE PROFILE
  on(updateProfile, (state) => {
    return {
      ...state,
      status: 'loading',
      error: null,
    };
  }),
  on(updateProfileSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...state?.data,
        user: {
          ...state?.data?.user,
          profile: payload?.data,
        },
      },
      status: 'loaded',
      error: null,
    };
  }),
  on(updateProfileFailure, (state, payload) => {
    return {
      ...state,
      status: 'init',
      error: payload.error,
    };
  }),

  // UPDATE USER
  on(updateUser, (state) => {
    return {
      ...state,
      status: 'loading',
      error: null,
    };
  }),
  on(updateUserSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
        user: {
          ...payload?.data,
        },
      },
      status: 'loaded',
      error: null,
    };
  }),
  on(updateUserFailure, (state, payload) => {
    return {
      ...state,
      status: 'init',
      error: payload.error,
    };
  }),

  // RETRIEVE USER
  on(retrieveUser, (state) => {
    return {
      ...state,
      status: 'loading',
      error: null,
    };
  }),
  on(retrieveUserSuccess, (state, payload) => {
    return {
      ...state,
      user: payload?.data,
      status: 'loaded',
      error: null,
    };
  }),
  on(retrieveUserFailure, (state, payload) => {
    return {
      ...state,
      status: 'init',
      error: payload.error,
    };
  }),

  // CHANGE PASSWORD
  on(changePassword, (state) => {
    return {
      ...state,
      status: 'loading',
      error: null,
    };
  }),
  on(changePasswordSuccess, (state, payload) => {
    return {
      ...state,
      status: 'loaded',
      error: null,
    };
  }),
  on(changePasswordFailure, (state, payload) => {
    return {
      ...state,
      status: 'init',
      error: payload.error,
    };
  })
);

export function PersonUserReducer(
  state: PersonUserState | undefined,
  action: Action
) {
  return reducer(state, action);
}
