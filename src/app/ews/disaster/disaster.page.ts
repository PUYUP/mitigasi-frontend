import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DisasterIncidents } from '../../core/disaster-identifier';
import { SendReportComponent } from '../../contribution/report/components/send-report/send-report.component';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { Observable, Subject } from 'rxjs';
import { personSelectUser } from 'src/app/person/store/selectors/user/user.selectors';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-disaster',
  templateUrl: './disaster.page.html',
  styleUrls: ['./disaster.page.scss'],
})
export class DisasterPage implements OnInit {
  user$: Observable<any>;
  onDestroy$ = new Subject<void>();

  token: string;
  identifier_id: string;
  identifier_label: string;
  selected_tab: string = 'sensor';

  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    // Load user
    this.user$ = this.store.pipe(select(personSelectUser));
    this.user$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.data?.token?.access) {
        this.token = state?.data?.token?.access;
      }
    });
  }

  async showReportModal() {
    const modal = await this.modalCtrl.create({
      component: SendReportComponent,
      componentProps: {
        identifier_id: this.identifier_id,
        identifier_label: this.identifier_label,
      },
    });

    /*
    modal.onDidDismiss().then((ret: any) => {
      if (ret?.data) {
        console.log(ret);
      }
    });
    */

    return await modal.present();
  }

  ngOnInit() {
    this.identifier_id = this.route.snapshot.paramMap.get('identifier_id');
    this.identifier_label = DisasterIncidents[this.identifier_id];
  }

  onSendReport() {
    if (this.token) {
      this.showReportModal();
    } else {
      this.router.navigate(['/SignIn']);
    }
  }

  onTabsChange(event: any) {
    this.selected_tab = event?.tab;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
