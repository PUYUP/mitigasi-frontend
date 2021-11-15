import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  loadComments,
  loadMoreComments,
} from 'src/app/contribution/store/actions/comment/comment.actions';
import { selectComments } from 'src/app/contribution/store/selectors/comment/comment.selectors';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input('applied_uuid') applied_uuid: string;
  @Input('applied_model') applied_model: string;

  comment$: Observable<any>;
  onDestroy$ = new Subject<void>();

  event: any;
  next: string;

  constructor(private store: Store<AppState>) {
    this.comment$ = this.store.pipe(select(selectComments));
    this.comment$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        this.next = state?.data?.next;
      }

      if (this.event) this.event.target.complete();
    });
  }

  ngOnInit() {
    this.store.dispatch(
      loadComments({
        applied_model: this.applied_model,
        applied_uuid: this.applied_uuid,
      })
    );
  }

  onInfinite(event: any) {
    this.event = event;

    if (this.next) {
      this.store.dispatch(
        loadMoreComments({
          next: this.next,
          applied_model: this.applied_model,
          applied_uuid: this.applied_uuid,
        })
      );
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
