import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { HazardMapService } from 'src/app/threat/services/hazard-map/hazard-map.service';
import {
  loadHazardMaps,
  loadHazardMapsFailure,
  loadHazardMapsSuccess,
} from '../../actions/hazard-map/hazard-map.actions';

@Injectable()
export class HazardMapEffects {
  constructor(
    private actions$: Actions,
    private hazardMapService: HazardMapService
  ) {}

  // LOADS
  loads$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadHazardMaps),
      mergeMap((payload) => {
        return this.hazardMapService.loads(payload).pipe(
          map((response) => {
            return loadHazardMapsSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadHazardMapsFailure({ error: error }));
          })
        );
      })
    )
  );

  loadsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadHazardMapsSuccess),
        map((response: any) => {
          return response;
        })
      ),
    { dispatch: false }
  );
}
