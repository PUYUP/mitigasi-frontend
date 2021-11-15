import { createAction, props } from '@ngrx/store';

export const recoveryPassword = createAction(
  '[Password] Recovery Password',
  props<{ data: any }>()
);

export const recoveryPasswordSuccess = createAction(
  '[Password] Recovery Password Success',
  props<{ data: any }>()
);

export const recoveryPasswordFailure = createAction(
  '[Password] Recovery Password Failure',
  props<{ error: any }>()
);
