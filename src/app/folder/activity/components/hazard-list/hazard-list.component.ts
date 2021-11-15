import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/store/reducers';
import {
  loadHazards,
  loadMoreHazards,
} from 'src/app/threat/store/actions/hazard/hazard.actions';
import { selectHazards } from 'src/app/threat/store/selectors/hazard/hazard.selectors';

@Component({
  selector: 'app-hazard-list',
  templateUrl: './hazard-list.component.html',
  styleUrls: ['./hazard-list.component.scss'],
})
export class HazardListComponent implements OnInit {
  @Input('user') user: any;

  hazard$: Observable<any>;
  onDestroy$ = new Subject<void>();

  event: any;
  next: string;

  constructor(private store: Store<AppState>) {
    this.hazard$ = this.store.pipe(select(selectHazards));
    this.hazard$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        this.next = state?.data?.next;
      }

      if (this.event) this.event.target.complete();
    });
  }

  ngOnInit() {
    this.store.dispatch(loadHazards({ user: this.user?.hexid }));
  }
  /**
   * Infinite scroll...
   */
  onLoadMore(event: any) {
    this.event = event;

    if (this.next) {
      this.store.dispatch(
        loadMoreHazards({
          next: this.next,
          user: this.user?.hexid,
        })
      );
    }
  }
}
