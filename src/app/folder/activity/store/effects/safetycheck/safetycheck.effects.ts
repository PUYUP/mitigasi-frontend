import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { SafetyCheckService } from 'src/app/generic/services/safetycheck/safetycheck.service';
import { AppState } from 'src/app/store/reducers';
import { updateHazardSuccess } from 'src/app/threat/store/actions/hazard/hazard.actions';
import {
  deleteActivitySafetyCheck,
  deleteActivitySafetyCheckFailure,
  deleteActivitySafetyCheckSuccess,
  loadActivitySafetyChecks,
  loadActivitySafetyChecksFailure,
  loadActivitySafetyChecksSuccess,
  loadMoreActivitySafetyChecks,
  loadMoreActivitySafetyChecksSuccess,
} from '../../actions/safetycheck/safetycheck.actions';

@Injectable()
export class ActivitySafetyCheckEffects {
  constructor(
    private actions$: Actions,
    private safetycheckService: SafetyCheckService,
    private modalCtrl: ModalController,
    private store: Store<AppState>
  ) {}

  // DELETE
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteActivitySafetyCheck),
      mergeMap((payload) => {
        return this.safetycheckService.delete(payload.uuid).pipe(
          map((response) => {
            return deleteActivitySafetyCheckSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(deleteActivitySafetyCheckFailure({ error: error }));
          })
        );
      })
    )
  );

  deleteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteActivitySafetyCheckSuccess),
        tap((response: any) => {
          let content_object = response?.data?.content_object;
          let contentObjectData = { ...content_object };

          return this.store.dispatch(
            updateHazardSuccess({
              data: {
                ...contentObjectData,
                from_safetycheck: true,
              },
            })
          );
        })
      ),
    { dispatch: false }
  );

  // LOADS
  loads$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadActivitySafetyChecks),
      mergeMap((payload) => {
        return this.safetycheckService.loads(payload).pipe(
          map((response) => {
            return loadActivitySafetyChecksSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadActivitySafetyChecksFailure({ error: error }));
          })
        );
      })
    )
  );

  loadMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMoreActivitySafetyChecks),
      mergeMap((payload) => {
        return this.safetycheckService.loads({ next: payload?.next }).pipe(
          map((response) => {
            return loadMoreActivitySafetyChecksSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadActivitySafetyChecksFailure({ error: error }));
          })
        );
      })
    )
  );

  loadsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadActivitySafetyChecksSuccess),
        map((response: any) => {
          return response;
        })
      ),
    { dispatch: false }
  );
}
