import { environment } from 'src/environments/environment';

const prefix = 'person/v1/';

export const Endpoints = {
  securecode: environment.endpoint + prefix + 'securecodes/',
  signin: environment.endpoint + prefix + 'token/',
  user: environment.endpoint + prefix + 'users/',
  recoveryPassword: environment.endpoint + prefix + 'password-recovery/',
};
