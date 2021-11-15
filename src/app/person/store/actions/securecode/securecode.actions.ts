import { createAction, props } from '@ngrx/store';

const TYPE = '[Securecode]';

// CREATE
export const createSecurecode = createAction(
  `${TYPE} Create`,
  props<{ data: any; resend?: boolean }>()
);

export const createSecurecodeSuccess = createAction(
  `${TYPE} Create Success`,
  props<{ data: any }>()
);

export const createSecurecodeFailure = createAction(
  `${TYPE} Create Failure`,
  props<{ error: any }>()
);

export const resetSecurecode = createAction(`${TYPE} Reset`);

// VALIDATE
export const validateSecurecode = createAction(
  `${TYPE} Validate`,
  props<{ passcode: string; data: any }>()
);

export const validateSecurecodeSuccess = createAction(
  `${TYPE} Validate Success`,
  props<{ data: any }>()
);

export const validateSecurecodeFailure = createAction(
  `${TYPE} Validate Failure`,
  props<{ error: any }>()
);
