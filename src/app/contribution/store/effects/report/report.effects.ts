import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ReportService } from 'src/app/contribution/services/report/report.service';
import {
  createReport,
  createReportFailure,
  createReportSuccess,
  deleteReport,
  deleteReportFailure,
  deleteReportSuccess,
  loadMoreReports,
  loadMoreReportsSuccess,
  loadReport,
  loadReportFailure,
  loadReports,
  loadReportsFailure,
  loadReportsSuccess,
  loadReportSuccess,
  updateReport,
  updateReportFailure,
  updateReportSuccess,
} from '../../actions/report/report.actions';

@Injectable()
export class ReportEffects {
  constructor(
    private actions$: Actions,
    private reportService: ReportService,
    private router: Router
  ) {}

  // CREATE
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createReport),
      mergeMap((payload) => {
        return this.reportService.create(payload.data).pipe(
          map((response) => {
            return createReportSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(createReportFailure({ error: error }));
          })
        );
      })
    )
  );

  createSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createReportSuccess),
        tap((response: any) => {
          this.router.navigate([
            '/Disaster',
            response?.data?.identifier,
            'Reported',
            response?.data?.uuid,
          ]);
        })
      ),
    { dispatch: false }
  );

  // UPDATE
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateReport),
      mergeMap((payload) => {
        return this.reportService.update(payload.uuid, payload.data).pipe(
          map((response) => {
            return updateReportSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(updateReportFailure({ error: error }));
          })
        );
      })
    )
  );

  // DELETE
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteReport),
      mergeMap((payload) => {
        return this.reportService.delete(payload.uuid).pipe(
          map((response) => {
            return deleteReportSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(deleteReportFailure({ error: error }));
          })
        );
      })
    )
  );

  // LOADS
  loads$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadReports),
      mergeMap((payload) => {
        return this.reportService.loads(payload).pipe(
          map((response) => {
            return loadReportsSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadReportsFailure({ error: error }));
          })
        );
      })
    )
  );

  loadMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMoreReports),
      mergeMap((payload) => {
        return this.reportService.loads({ next: payload?.next }).pipe(
          map((response) => {
            return loadMoreReportsSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadReportsFailure({ error: error }));
          })
        );
      })
    )
  );

  loadsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadReportsSuccess),
        map((response: any) => {
          return response;
        })
      ),
    { dispatch: false }
  );

  // RETRIEVE
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadReport),
      mergeMap((payload) => {
        return this.reportService.load(payload.uuid).pipe(
          map((response) => {
            return loadReportSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadReportFailure({ error: error }));
          })
        );
      })
    )
  );
}
