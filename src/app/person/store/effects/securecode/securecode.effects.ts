import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { SecurecodeService } from 'src/app/person/services/securecode/securecode.service';
import { AppState } from 'src/app/store/reducers';
import {
  createSecurecode,
  createSecurecodeFailure,
  createSecurecodeSuccess,
  resetSecurecode,
  validateSecurecode,
  validateSecurecodeFailure,
  validateSecurecodeSuccess,
} from '../../actions/securecode/securecode.actions';

@Injectable()
export class PersonSecurecodeEffects {
  constructor(
    private actions$: Actions,
    private securecodeService: SecurecodeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  // CREATE
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createSecurecode),
      mergeMap((payload) => {
        return this.securecodeService.create(payload?.data).pipe(
          map((response) => {
            return createSecurecodeSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => of(createSecurecodeFailure({ error: error })))
        );
      })
    )
  );

  createSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createSecurecodeSuccess),
        tap((payload: any) => {
          let challenge = payload?.data?.challenge;

          const queryParams = {
            token: payload?.data?.token,
            challenge: challenge,
            issuer: payload?.data?.issuer,
          };

          if (payload?.resend) {
            this.router.navigate([], {
              queryParams: queryParams,
              queryParamsHandling: 'merge',
              relativeTo: this.route,
              replaceUrl: true,
            });
          } else {
            if (challenge != 'change_email' && challenge != 'change_msisdn') {
              // RESET
              this.store.dispatch(resetSecurecode());

              this.router.navigate(['/Validation'], {
                queryParams: queryParams,
              });
            }
          }
        })
      ),
    { dispatch: false }
  );

  // VALIDATE
  validate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(validateSecurecode),
      mergeMap((payload) => {
        return this.securecodeService
          .validate(payload?.passcode, payload?.data)
          .pipe(
            map((response) => {
              return validateSecurecodeSuccess({
                data: response,
              });
            }),
            catchError((error) =>
              of(validateSecurecodeFailure({ error: error }))
            )
          );
      })
    )
  );

  validateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(validateSecurecodeSuccess),
        tap((response: any) => {
          const challenge = response?.data?.challenge;

          let router = undefined;
          let queryParams: any = {
            passcode: response?.data?.passcode,
            token: response?.data?.token,
            challenge: challenge,
            issuer: response?.data?.issuer,
          };

          if (challenge == 'validate_msisdn') {
            router = '/SignUp';
          } else if (challenge == 'password_recovery') {
            router = '/PasswordRecovery';

            for (let k in response?.data?.password_recovery) {
              queryParams['password_' + k] =
                response?.data?.password_recovery[k];
            }
          }

          if (router) {
            this.router.navigate([router], {
              queryParams,
            });
          }
        })
      ),
    { dispatch: false }
  );

  validateFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(validateSecurecodeFailure),
        switchMap((error) => {
          return of(error);
        })
      ),
    { dispatch: false }
  );
}
