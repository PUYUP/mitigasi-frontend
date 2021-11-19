import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { CommentService } from 'src/app/generic/services/comment/comment.service';
import { AppState } from 'src/app/store/reducers';
import { updateHazardSuccess } from 'src/app/threat/store/actions/hazard/hazard.actions';
import {
  deleteActivityComment,
  deleteActivityCommentFailure,
  deleteActivityCommentSuccess,
  loadActivityComments,
  loadActivityCommentsFailure,
  loadActivityCommentsSuccess,
  loadMoreActivityComments,
  loadMoreActivityCommentsSuccess,
} from '../../actions/comment/comment.actions';

@Injectable()
export class ActivityCommentEffects {
  constructor(
    private actions$: Actions,
    private commentService: CommentService,
    private modalCtrl: ModalController,
    private store: Store<AppState>
  ) {}

  // DELETE
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteActivityComment),
      mergeMap((payload) => {
        return this.commentService.delete(payload.uuid).pipe(
          map((response) => {
            return deleteActivityCommentSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(deleteActivityCommentFailure({ error: error }));
          })
        );
      })
    )
  );

  deleteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteActivityCommentSuccess),
        tap((response: any) => {
          return response;
        })
      ),
    { dispatch: false }
  );

  // LOADS
  loads$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadActivityComments),
      mergeMap((payload) => {
        return this.commentService.loads(payload).pipe(
          map((response) => {
            return loadActivityCommentsSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadActivityCommentsFailure({ error: error }));
          })
        );
      })
    )
  );

  loadMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMoreActivityComments),
      mergeMap((payload) => {
        return this.commentService.loads({ next: payload?.next }).pipe(
          map((response) => {
            return loadMoreActivityCommentsSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadActivityCommentsFailure({ error: error }));
          })
        );
      })
    )
  );

  loadsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadActivityCommentsSuccess),
        map((response: any) => {
          return response;
        })
      ),
    { dispatch: false }
  );
}
