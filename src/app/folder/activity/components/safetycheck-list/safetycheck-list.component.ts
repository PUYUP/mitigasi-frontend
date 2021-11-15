import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/store/reducers';
import {
  loadActivitySafetyChecks,
  loadMoreActivitySafetyChecks,
} from '../../store/actions/safetycheck/safetycheck.actions';
import { selectActivitySafetyChecks } from '../../store/selectors/safetycheck/safetycheck.selectors';

@Component({
  selector: 'app-safetycheck-list',
  templateUrl: './safetycheck-list.component.html',
  styleUrls: ['./safetycheck-list.component.scss'],
})
export class SafetycheckListComponent implements OnInit {
  @Input('user') user: any;

  safetycheck$: Observable<any>;
  onDestroy$ = new Subject<void>();

  event: any;
  next: string;

  constructor(private store: Store<AppState>) {
    this.safetycheck$ = this.store.pipe(select(selectActivitySafetyChecks));
    this.safetycheck$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state: any) => {
        if (state?.status == 'loaded') {
          this.next = state?.data?.next;
        }

        if (this.event) this.event.target.complete();
      });
  }

  ngOnInit() {
    this.store.dispatch(
      loadActivitySafetyChecks({
        user: this.user?.hexid,
        content_type: 'hazard',
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
        loadMoreActivitySafetyChecks({
          next: this.next,
          user: this.user?.hexid,
          content_type: 'hazard',
        })
      );
    }
  }
}
