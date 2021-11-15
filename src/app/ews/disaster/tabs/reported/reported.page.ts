import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  loadMoreReports,
  loadReports,
} from 'src/app/contribution/store/actions/report/report.actions';
import { selectReports } from 'src/app/contribution/store/selectors/report/report.selectors';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-reported',
  templateUrl: './reported.page.html',
  styleUrls: ['./reported.page.scss'],
})
export class ReportedPage implements OnInit {
  reported$: Observable<any>;
  onDestroy$ = new Subject<void>();

  identifier: string;
  event: any;
  next: string;
  results: any = [];

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.reported$ = this.store.pipe(select(selectReports));
    this.reported$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        this.next = state?.data?.next;
        this.results = state?.data?.results;
      }

      if (this.event) this.event.target.complete();
    });
  }

  ngOnInit() {
    this.identifier = this.route.snapshot.paramMap.get('identifier_id');
    this.store.dispatch(loadReports({ identifier: this.identifier }));
  }

  onInfinite(event: any) {
    this.event = event;

    if (this.next) {
      this.store.dispatch(
        loadMoreReports({
          next: this.next,
          identifier: this.identifier,
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
