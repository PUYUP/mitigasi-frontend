import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { SafetyCheckMapService } from 'src/app/generic/services/safetycheck-map/safetycheck-map.service';
import { AppState } from 'src/app/store/reducers';
import {
  loadSafetyCheckMaps,
  loadSafetyCheckMapsFailure,
  loadSafetyCheckMapsSuccess,
  resetSafetyCheckMaps,
} from '../../actions/safetycheck-map/safetycheck-map.actions';

@Injectable()
export class SafetyCheckMapEffects {
  constructor(
    private actions$: Actions,
    private safetyCheckMapService: SafetyCheckMapService,
    private store: Store<AppState>
  ) {}

  // LOADS
  loads$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSafetyCheckMaps),
      mergeMap((payload) => {
        return this.safetyCheckMapService.loads(payload).pipe(
          map((response) => {
            return loadSafetyCheckMapsSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadSafetyCheckMapsFailure({ error: error }));
          })
        );
      })
    )
  );

  loadsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadSafetyCheckMapsSuccess),
        map((response: any) => {
          this.store.dispatch(resetSafetyCheckMaps());

          return response;
        })
      ),
    { dispatch: false }
  );
}
