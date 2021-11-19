import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { CommentService } from 'src/app/generic/services/comment/comment.service';
import { AppState } from 'src/app/store/reducers';
import { instantUpdateHazard } from 'src/app/threat/store/actions/hazard/hazard.actions';
import {
  createComment,
  createCommentFailure,
  createCommentSuccess,
  deleteComment,
  deleteCommentFailure,
  deleteCommentSuccess,
  loadMoreComments,
  loadMoreCommentsSuccess,
  loadComment,
  loadCommentFailure,
  loadComments,
  loadCommentsFailure,
  loadCommentsSuccess,
  loadCommentSuccess,
  updateComment,
  updateCommentFailure,
  updateCommentSuccess,
} from '../../actions/comment/comment.actions';

@Injectable()
export class CommentEffects {
  constructor(
    private actions$: Actions,
    private commentService: CommentService,
    private router: Router,
    private store: Store<AppState>,
    public modalCtrl: ModalController
  ) {}

  // CREATE
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createComment),
      mergeMap((payload) => {
        return this.commentService.create(payload.data).pipe(
          map((response) => {
            return createCommentSuccess({
              data: { ...response, from: payload.data?.from },
            });
          }),
          catchError((error) => {
            return of(createCommentFailure({ error: error }));
          })
        );
      })
    )
  );

  createSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createCommentSuccess),
        tap((payload: any) => {
          let contentObject = payload.data?.content_object;

          this.store.dispatch(
            instantUpdateHazard({
              data: {
                uuid: contentObject?.uuid,
                comment_count: contentObject?.comment_count,
              },
            })
          );

          if (payload.data?.from == 'list') {
            this.router.navigate([
              '/Threat',
              contentObject?.classify,
              contentObject?.uuid,
              'Comment',
            ]);
          }
        })
      ),
    { dispatch: false }
  );

  // UPDATE
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateComment),
      mergeMap((payload) => {
        return this.commentService.update(payload.uuid, payload.data).pipe(
          map((response) => {
            // close CommentEditorComponent
            this.modalCtrl.getTop().then((v: any) => {
              if (v) {
                this.modalCtrl.dismiss({
                  ...response,
                });
              }
            });

            return updateCommentSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(updateCommentFailure({ error: error }));
          })
        );
      })
    )
  );

  // DELETE
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteComment),
      mergeMap((payload) => {
        return this.commentService.delete(payload.uuid).pipe(
          map((response) => {
            return deleteCommentSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(deleteCommentFailure({ error: error }));
          })
        );
      })
    )
  );

  deleteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteCommentSuccess),
        tap((payload: any) => {
          let contentObject = payload.data?.content_object;

          this.store.dispatch(
            instantUpdateHazard({
              data: {
                uuid: contentObject?.uuid,
                comment_count: contentObject?.comment_count - 1,
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
      ofType(loadComments),
      mergeMap((payload) => {
        return this.commentService.loads(payload).pipe(
          map((response) => {
            return loadCommentsSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadCommentsFailure({ error: error }));
          })
        );
      })
    )
  );

  loadMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMoreComments),
      mergeMap((payload) => {
        return this.commentService.loads({ next: payload?.next }).pipe(
          map((response) => {
            return loadMoreCommentsSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadCommentsFailure({ error: error }));
          })
        );
      })
    )
  );

  loadsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadCommentsSuccess),
        map((response: any) => {
          return response;
        })
      ),
    { dispatch: false }
  );

  // RETRIEVE
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadComment),
      mergeMap((payload) => {
        return this.commentService.load(payload.uuid).pipe(
          map((response) => {
            return loadCommentSuccess({
              data: { ...response },
            });
          }),
          catchError((error) => {
            return of(loadCommentFailure({ error: error }));
          })
        );
      })
    )
  );
}
