import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { RecoveryPasswordService } from 'src/app/person/services/recovery-password/recovery-password.service';
import {
  recoveryPassword,
  recoveryPasswordFailure,
  recoveryPasswordSuccess,
} from '../../actions/password/password.actions';

@Injectable()
export class PersonPasswordEffects {
  constructor(
    private actions$: Actions,
    private recoveryPasswordService: RecoveryPasswordService,
    private router: Router,
    public toastController: ToastController
  ) {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  recovery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(recoveryPassword),
      mergeMap((payload) => {
        return this.recoveryPasswordService.recovery(payload?.data).pipe(
          map((response) => {
            return recoveryPasswordSuccess({
              data: response,
            });
          }),
          catchError((error) => of(recoveryPasswordFailure({ error: error })))
        );
      })
    )
  );

  recoverySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(recoveryPasswordSuccess),
        tap((response: any) => {
          this.presentToast('Berhasil! Login dengan password baru.');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  recoveryFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(recoveryPasswordFailure),
        switchMap((error) => {
          return of(error);
        })
      ),
    { dispatch: false }
  );
}
