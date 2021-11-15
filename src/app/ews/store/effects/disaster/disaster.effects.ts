import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { DisasterService } from 'src/app/ews/services/disaster/disaster.service';
import {
  loadDisaster,
  loadDisasterFailure,
  loadDisasters,
  loadDisastersFailure,
  loadDisastersSuccess,
  loadDisasterSuccess,
  loadMoreDisasters,
  loadMoreDisastersSuccess,
  scrapeDisasters,
  scrapeDisastersFailure,
  scrapeDisastersSuccess,
} from '../../actions/disaster/disaster.actions';

@Injectable()
export class DisasterEffects {
  constructor(
    private actions$: Actions,
    private disasterService: DisasterService
  ) {}

  // LOADS
  loads$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDisasters),
      mergeMap((payload) => {
        return this.disasterService.loads(payload).pipe(
          map((response) => {
            return loadDisastersSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadDisastersFailure({ error: error }));
          })
        );
      })
    )
  );

  loadMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMoreDisasters),
      mergeMap((payload) => {
        return this.disasterService.loads({ next: payload?.next }).pipe(
          map((response) => {
            return loadMoreDisastersSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadDisastersFailure({ error: error }));
          })
        );
      })
    )
  );

  loadsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadDisastersSuccess),
        map((response: any) => {
          return response;
        })
      ),
    { dispatch: false }
  );

  // SCRAPE
  scrape$ = createEffect(() =>
    this.actions$.pipe(
      ofType(scrapeDisasters),
      mergeMap((payload) => {
        return this.disasterService.bnpb_dipi_scraper(payload).pipe(
          mergeMap((response) => {
            if (response?.has_data) {
              return this.disasterService.loads(payload).pipe(
                map((response) => {
                  return scrapeDisastersSuccess({
                    data: {
                      scrape_results: response?.results,
                    },
                  });
                }),
                catchError((error) => {
                  return of(scrapeDisastersFailure({ error: error }));
                })
              );
            } else {
              return of(
                scrapeDisastersSuccess({
                  data: {
                    scrape_results: [],
                  },
                })
              );
            }
          }),
          catchError((error) => of(scrapeDisastersFailure({ error: error })))
        );
      })
    )
  );

  // RETRIEVE
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDisaster),
      mergeMap((payload) => {
        return this.disasterService.load(payload.uuid).pipe(
          map((response) => {
            return loadDisasterSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadDisasterFailure({ error: error }));
          })
        );
      })
    )
  );
}
