import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DisasterIncidents } from 'src/app/core/disaster-identifier';
import { loadDisaster } from 'src/app/ews/store/actions/disaster/disaster.actions';
import { selectDisaster } from 'src/app/ews/store/selectors/disaster/disaster.selectors';
import { AppState } from 'src/app/store/reducers';
import { SafetyCheckComponent } from '../../components/safety-check/safety-check.component';

@Component({
  selector: 'app-disaster-detail',
  templateUrl: './disaster-detail.page.html',
  styleUrls: ['./disaster-detail.page.scss'],
})
export class DisasterDetailPage implements OnInit {
  identifier_id: string;
  identifier_label: string;
  disaster_uuid: string;

  disaster$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.identifier_id = this.route.snapshot.paramMap.get('identifier_id');
    this.identifier_label = DisasterIncidents[this.identifier_id];
    this.disaster_uuid = this.route.snapshot.paramMap.get('disaster_uuid');

    this.store.dispatch(loadDisaster({ uuid: this.disaster_uuid }));
    this.disaster$ = this.store.pipe(
      select(selectDisaster({ disaster_uuid: this.disaster_uuid }))
    );
  }

  async showSafetyCheck() {
    const modal = await this.modalCtrl.create({
      component: SafetyCheckComponent,
      backdropDismiss: false,
    });

    return await modal.present();
  }

  onConfirm(reaction: string): void {
    this.showSafetyCheck();
  }
}
