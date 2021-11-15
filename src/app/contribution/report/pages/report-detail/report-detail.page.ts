import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadReport } from 'src/app/contribution/store/actions/report/report.actions';
import { selectReport } from 'src/app/contribution/store/selectors/report/report.selectors';
import { DisasterIncidents } from 'src/app/core/disaster-identifier';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.page.html',
  styleUrls: ['./report-detail.page.scss'],
})
export class ReportDetailPage implements OnInit {
  identifier_id: string;
  identifier_label: string;
  report_uuid: string;

  report$: Observable<any>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.identifier_id = this.route.snapshot.paramMap.get('identifier_id');
    this.identifier_label = DisasterIncidents[this.identifier_id];
    this.report_uuid = this.route.snapshot.paramMap.get('report_uuid');

    this.store.dispatch(loadReport({ uuid: this.report_uuid }));
    this.report$ = this.store.pipe(
      select(selectReport({ report_uuid: this.report_uuid }))
    );
  }

  onConfirm(identifier: string) {}
}
