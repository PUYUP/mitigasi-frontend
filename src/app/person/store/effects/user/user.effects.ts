import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/person/services/user/user.service';
import { AppState } from 'src/app/store/reducers';
import { loadHazards } from 'src/app/threat/store/actions/hazard/hazard.actions';
import {
  changePassword,
  changePasswordFailure,
  changePasswordSuccess,
  getUserFromCookie,
  getUserFromCookieSuccess,
  retrieveUser,
  retrieveUserFailure,
  retrieveUserSuccess,
  signinUser,
  signinUserFailure,
  signinUserSuccess,
  signoutUser,
  signoutUserSuccess,
  signupUser,
  signupUserFailure,
  signupUserSuccess,
  updateProfile,
  updateProfileFailure,
  updateProfileSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
} from '../../actions/user/user.actions';

@Injectable()
export class PersonUserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  // SIGNUP
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupUser),
      mergeMap((payload) => {
        return this.userService.signup(payload?.data).pipe(
          map((response) => {
            return signupUserSuccess({
              data: { ...response, password: payload?.data?.password },
            });
          }),
          catchError((error) => of(signupUserFailure({ error: error })))
        );
      })
    )
  );

  signupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupUserSuccess),
      map((response: any) => {
        return signinUser({
          data: {
            username: response?.data?.username,
            password: response?.data?.password,
          },
        });
      })
    )
  );

  // SIGNIN
  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signinUser),
      mergeMap((payload) => {
        return this.userService.signin(payload?.data).pipe(
          map((response) => {
            return signinUserSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => of(signinUserFailure({ error: error })))
        );
      })
    )
  );

  signinSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signinUserSuccess),
        tap((response: any) => {
          this.store.dispatch(loadHazards({}));

          this.router.navigate(['/'], {
            replaceUrl: true,
          });
        })
      ),
    { dispatch: false }
  );

  // SIGNOUT
  signout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signoutUser),
      map(() => {
        this.userService.signout();

        return signoutUserSuccess({
          data: {},
        });
      })
    )
  );

  signoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signoutUserSuccess),
        tap((response: any) => {
          this.store.dispatch(loadHazards({}));

          this.router.navigate(['/Home'], {
            replaceUrl: true,
          });
        })
      ),
    { dispatch: false }
  );

  // GET USER FROM COOKIE
  getFromCookie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserFromCookie),
      map((payload) => {
        return getUserFromCookieSuccess({
          data: this.userService.getCurrentUser(),
        });
      })
    )
  );

  getFromCookieSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getUserFromCookieSuccess),
        tap((response: any) => {
          //console.log(response);
        })
      ),
    { dispatch: false }
  );

  // UPDATE PROFILE
  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProfile),
      mergeMap((payload) => {
        return this.userService
          .updateProfile(payload?.hexid, payload?.data)
          .pipe(
            map((response) => {
              return updateProfileSuccess({
                data: { ...response },
              });
            }),
            catchError((error) => of(updateProfileFailure({ error: error })))
          );
      })
    )
  );

  updateProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateProfileSuccess),
        map((response: any) => {
          return response;
        })
      ),
    { dispatch: false }
  );

  // UPDATE USER
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap((payload) => {
        return this.userService.updateUser(payload?.hexid, payload?.data).pipe(
          map((response) => {
            return updateUserSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => of(updateUserFailure({ error: error })))
        );
      })
    )
  );

  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateUserSuccess),
        map((response: any) => {
          return response;
        })
      ),
    { dispatch: false }
  );

  // CHANGE PASSWORD
  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changePassword),
      mergeMap((payload) => {
        return this.userService
          .changePassword(payload?.hexid, payload?.data)
          .pipe(
            map((response) => {
              return changePasswordSuccess({
                data: { ...response },
              });
            }),
            catchError((error) => of(changePasswordFailure({ error: error })))
          );
      })
    )
  );

  changePasswordSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changePasswordSuccess),
      tap(() =>
        this.router.navigate(['/Home'], {
          replaceUrl: true,
        })
      ),
      map((response: any) => {
        return signoutUser();
      })
    )
  );

  // RETRIEVE USER
  retrieveUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveUser),
      mergeMap((payload) => {
        return this.userService.retrieveUser(payload?.hexid).pipe(
          map((response) => {
            return retrieveUserSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => of(retrieveUserFailure({ error: error })))
        );
      })
    )
  );

  retrieveUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(retrieveUserSuccess),
        map((response: any) => {
          return response;
        })
      ),
    { dispatch: false }
  );
}
