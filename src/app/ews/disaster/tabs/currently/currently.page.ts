import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  loadDisasters,
  loadMoreDisasters,
  scrapeDisasters,
} from 'src/app/ews/store/actions/disaster/disaster.actions';
import {
  selectDisasters,
  selectScrappingDisasters,
} from 'src/app/ews/store/selectors/disaster/disaster.selectors';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-currently',
  templateUrl: './currently.page.html',
  styleUrls: ['./currently.page.scss'],
})
export class CurrentlyPage implements OnInit {
  disaster$: Observable<any>;
  scrape_disaster$: Observable<any>;
  onDestroy$ = new Subject<void>();

  identifier: string;
  event: any;
  next: string;
  results: any = [];
  is_scrapping: boolean = false;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.disaster$ = this.store.pipe(select(selectDisasters));
    this.disaster$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        this.next = state?.data?.next;
        this.results = state?.data?.results;
      }

      if (this.event) this.event.target.complete();
    });

    this.scrape_disaster$ = this.store.pipe(select(selectScrappingDisasters));
    this.scrape_disaster$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state: any) => {
        this.is_scrapping = state?.is_scrapping;
      });
  }

  ngOnInit() {
    this.identifier = this.route.snapshot.paramMap.get('identifier_id');
    this.store.dispatch(loadDisasters({ identifier: this.identifier }));
    this.store.dispatch(scrapeDisasters({ identifier: this.identifier }));
  }

  onInfinite(event: any) {
    this.event = event;

    if (this.next) {
      this.store.dispatch(
        loadMoreDisasters({
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
