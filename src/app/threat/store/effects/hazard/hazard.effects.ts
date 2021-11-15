import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  finalize,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { HazardService } from 'src/app/threat/services/hazard/hazard.service';
import {
  createHazard,
  createHazardFailure,
  createHazardSuccess,
  deleteHazard,
  deleteHazardFailure,
  deleteHazardSuccess,
  loadHazard,
  loadHazardFailure,
  loadHazards,
  loadHazardsFailure,
  loadHazardsSuccess,
  loadHazardSuccess,
  loadMoreHazards,
  loadMoreHazardsSuccess,
  resetHazard,
  scrapeHazards,
  scrapeHazardsFailure,
  scrapeHazardsSuccess,
  updateHazard,
  updateHazardFailure,
  updateHazardSuccess,
} from '../../actions/hazard/hazard.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';

@Injectable()
export class HazardEffects {
  constructor(
    private actions$: Actions,
    private hazardService: HazardService,
    private modalCtrl: ModalController,
    private location: Location,
    private router: Router,
    private store: Store<AppState>
  ) {}

  // CREATE
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createHazard),
      mergeMap((payload) => {
        return this.hazardService.create(payload.data).pipe(
          map((response) => {
            return createHazardSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(createHazardFailure({ error: error }));
          })
        );
      })
    )
  );

  createSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createHazardSuccess),
        tap(async (response: any) => {
          // close HazardEditorComponent
          const modal = await this.modalCtrl.getTop();
          if (modal) {
            this.modalCtrl.dismiss();
          }

          /*
          this.router.navigate([
            '/Disaster',
            response?.data?.identifier,
            'Hazarded',
            response?.data?.uuid,
          ]);
          */
        })
      ),
    { dispatch: false }
  );

  // UPDATE
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateHazard),
      mergeMap((payload) => {
        return this.hazardService.update(payload.uuid, payload.data).pipe(
          map((response) => {
            // close HazardEditorComponent
            const modal = this.modalCtrl.getTop();
            if (modal) {
              this.modalCtrl.dismiss({
                ...response,
              });
            }

            return updateHazardSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(updateHazardFailure({ error: error }));
          })
        );
      })
    )
  );

  updateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateHazardSuccess),
        tap((response) => {
          return response;
        })
      ),
    { dispatch: false }
  );

  // DELETE
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteHazard),
      mergeMap((payload) => {
        return this.hazardService.delete(payload.uuid).pipe(
          map((response) => {
            return deleteHazardSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(deleteHazardFailure({ error: error }));
          })
        );
      })
    )
  );

  deleteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteHazardSuccess),
        tap((response) => {
          return response;
        })
      ),
    { dispatch: false }
  );

  // LOADS
  loads$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadHazards),
      mergeMap((payload) => {
        return this.hazardService.loads(payload).pipe(
          map((response) => {
            return loadHazardsSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadHazardsFailure({ error: error }));
          })
        );
      })
    )
  );

  loadMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMoreHazards),
      mergeMap((payload) => {
        return this.hazardService.loads({ next: payload?.next }).pipe(
          map((response) => {
            return loadMoreHazardsSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadHazardsFailure({ error: error }));
          })
        );
      })
    )
  );

  loadsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadHazardsSuccess),
        map((response: any) => {
          return response;
        })
      ),
    { dispatch: false }
  );

  // RETRIEVE
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadHazard),
      mergeMap((payload) => {
        return this.hazardService.load(payload.uuid).pipe(
          map((response) => {
            return loadHazardSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadHazardFailure({ error: error }));
          })
        );
      })
    )
  );

  loadSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadHazardSuccess),
        tap((response) => {
          return response;
        })
      ),
    { dispatch: false }
  );
}
