import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/store/reducers';
import {
  deleteActivityComment,
  loadActivityComments,
  loadMoreActivityComments,
} from '../../store/actions/comment/comment.actions';
import { selectActivityComments } from '../../store/selectors/comment/comment.selectors';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input('user') user: any;

  comment$: Observable<any>;
  onDestroy$ = new Subject<void>();

  event: any;
  next: string;

  constructor(private store: Store<AppState>) {
    this.comment$ = this.store.pipe(select(selectActivityComments));
    this.comment$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        this.next = state?.data?.next;
      }

      if (this.event) this.event.target.complete();
    });
  }

  ngOnInit() {
    this.store.dispatch(
      loadActivityComments({
        user_id: this.user?.hexid,
        content_type: 'hazard',
        sort: 'newest',
      })
    );
  }

  /**
   * Infinite scroll...
   */
  onLoadMore(event: any) {
    this.event = event;

    if (this.next) {
      this.store.dispatch(
        loadMoreActivityComments({
          next: this.next,
          user_id: this.user?.hexid,
          content_type: 'hazard',
          sort: 'newest',
        })
      );
    }
  }

  /**
   * Delete
   */
  delete(item: any) {
    this.store.dispatch(deleteActivityComment({ uuid: item.uuid }));
  }
}
