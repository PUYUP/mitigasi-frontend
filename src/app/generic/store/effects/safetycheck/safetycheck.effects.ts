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
  createSafetyCheck,
  createSafetyCheckFailure,
  createSafetyCheckSuccess,
  deleteSafetyCheck,
  deleteSafetyCheckFailure,
  deleteSafetyCheckSuccess,
  loadSafetyCheck,
  loadSafetyCheckFailure,
  loadSafetyChecks,
  loadSafetyChecksFailure,
  loadSafetyChecksSuccess,
  loadSafetyCheckSuccess,
  loadMoreSafetyChecks,
  loadMoreSafetyChecksSuccess,
  updateSafetyCheck,
  updateSafetyCheckFailure,
  updateSafetyCheckSuccess,
} from '../../actions/safetycheck/safetycheck.actions';

@Injectable()
export class SafetyCheckEffects {
  constructor(
    private actions$: Actions,
    private safetycheckService: SafetyCheckService,
    private modalCtrl: ModalController,
    private store: Store<AppState>
  ) {}

  // CREATE
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createSafetyCheck),
      mergeMap((payload) => {
        return this.safetycheckService.create(payload.data).pipe(
          map((response) => {
            return createSafetyCheckSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(createSafetyCheckFailure({ error: error }));
          })
        );
      })
    )
  );

  createSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createSafetyCheckSuccess),
        tap(async (response: any) => {
          // close SafetyCheckEditorComponent
          const modal = await this.modalCtrl.getTop();
          if (modal) {
            this.modalCtrl.dismiss();
          }

          let content_object = response?.data?.content_object;
          let content_objectData = { ...content_object };

          return this.store.dispatch(
            updateHazardSuccess({
              data: {
                ...content_objectData,
                from_safetycheck: true,
              },
            })
          );
        })
      ),
    { dispatch: false }
  );

  // UPDATE
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSafetyCheck),
      mergeMap((payload) => {
        return this.safetycheckService.update(payload.uuid, payload.data).pipe(
          map((response) => {
            // close SafetyCheckEditorComponent
            const modal = this.modalCtrl.getTop();
            if (modal) {
              this.modalCtrl.dismiss({
                ...response,
              });
            }

            return updateSafetyCheckSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(updateSafetyCheckFailure({ error: error }));
          })
        );
      })
    )
  );

  updateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateSafetyCheckSuccess),
        tap((response: any) => {
          return response;
        })
      ),
    { dispatch: false }
  );

  // DELETE
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteSafetyCheck),
      mergeMap((payload) => {
        return this.safetycheckService.delete(payload.uuid).pipe(
          map((response) => {
            return deleteSafetyCheckSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(deleteSafetyCheckFailure({ error: error }));
          })
        );
      })
    )
  );

  deleteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteSafetyCheckSuccess),
        tap((response: any) => {
          let content_object = response?.data?.content_object;
          let content_objectData = { ...content_object };

          return this.store.dispatch(
            updateHazardSuccess({
              data: {
                ...content_objectData,
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
      ofType(loadSafetyChecks),
      mergeMap((payload) => {
        return this.safetycheckService.loads(payload).pipe(
          map((response) => {
            return loadSafetyChecksSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadSafetyChecksFailure({ error: error }));
          })
        );
      })
    )
  );

  loadMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMoreSafetyChecks),
      mergeMap((payload) => {
        return this.safetycheckService.loads({ next: payload?.next }).pipe(
          map((response) => {
            return loadMoreSafetyChecksSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadSafetyChecksFailure({ error: error }));
          })
        );
      })
    )
  );

  loadsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadSafetyChecksSuccess),
        map((response: any) => {
          return response;
        })
      ),
    { dispatch: false }
  );

  // RETRIEVE
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSafetyCheck),
      mergeMap((payload) => {
        return this.safetycheckService.load(payload.uuid).pipe(
          map((response) => {
            return loadSafetyCheckSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadSafetyCheckFailure({ error: error }));
          })
        );
      })
    )
  );
}
