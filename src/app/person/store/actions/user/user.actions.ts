import { createAction, props } from '@ngrx/store';

const TYPE = '[User]';

// SIGNUP
export const signupUser = createAction(
  `${TYPE} Signup`,
  props<{ data: any }>()
);

export const signupUserSuccess = createAction(
  `${TYPE} Signup Success`,
  props<{ data: any }>()
);

export const signupUserFailure = createAction(
  `${TYPE} Signup Failure`,
  props<{ error: any }>()
);

// SIGNIN
export const signinUser = createAction(
  `${TYPE} Signin`,
  props<{ data: any }>()
);

export const signinUserSuccess = createAction(
  `${TYPE} Signin Success`,
  props<{ data: any }>()
);

export const signinUserFailure = createAction(
  `${TYPE} Signin Failure`,
  props<{ error: any }>()
);

// SIGNOUT
export const signoutUser = createAction(`${TYPE} Signout`);

export const signoutUserSuccess = createAction(
  `${TYPE} Signout Success`,
  props<{ data: any }>()
);

// GET USER FROM COOKIE
export const getUserFromCookie = createAction(`${TYPE} Get From Cookie`);

export const getUserFromCookieSuccess = createAction(
  `${TYPE} Get From Cookie Success`,
  props<{ data: any }>()
);

// PROFILE
export const updateProfile = createAction(
  `${TYPE} Update Profile`,
  props<{ hexid: string; data: any }>()
);

export const updateProfileSuccess = createAction(
  `${TYPE} Update Profile Success`,
  props<{ data: any }>()
);

export const updateProfileFailure = createAction(
  `${TYPE} Update Profile Failure`,
  props<{ error: any }>()
);

// USER
export const updateUser = createAction(
  `${TYPE} Update User`,
  props<{ hexid: string; data: any }>()
);

export const updateUserSuccess = createAction(
  `${TYPE} Update User Success`,
  props<{ data: any }>()
);

export const updateUserFailure = createAction(
  `${TYPE} Update User Failure`,
  props<{ error: any }>()
);

// CHANGE PASSWORD
export const changePassword = createAction(
  `${TYPE} Change Password`,
  props<{ hexid: string; data: any }>()
);

export const changePasswordSuccess = createAction(
  `${TYPE} Change Password Success`,
  props<{ data: any }>()
);

export const changePasswordFailure = createAction(
  `${TYPE} Change Password Failure`,
  props<{ error: any }>()
);

// RETRIEVE USER
export const retrieveUser = createAction(
  `${TYPE} Retrieve User`,
  props<{ hexid: string }>()
);

export const retrieveUserSuccess = createAction(
  `${TYPE} Retrieve User Success`,
  props<{ data: any }>()
);

export const retrieveUserFailure = createAction(
  `${TYPE} Retrieve User Failure`,
  props<{ error: any }>()
);
