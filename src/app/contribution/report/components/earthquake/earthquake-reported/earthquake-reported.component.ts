import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { deleteReport } from 'src/app/contribution/store/actions/report/report.actions';
import { DisasterIncidents } from 'src/app/core/disaster-identifier';
import { AppState } from 'src/app/store/reducers';
import { SendReportComponent } from '../../send-report/send-report.component';

@Component({
  selector: 'app-earthquake-reported',
  templateUrl: './earthquake-reported.component.html',
  styleUrls: ['./earthquake-reported.component.scss'],
})
export class EarthquakeReportedComponent implements OnInit {
  @Input('item') item: any;
  @Input('last') last: boolean;

  identifier_label: string;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    private store: Store<AppState>
  ) {}

  async presentActionSheet(item: any = {}) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Tindakan',
      buttons: [
        {
          text: 'Edit',
          icon: 'create-outline',
          handler: () => {
            this.showReportModal();
          },
        },
        {
          text: 'Hapus',
          icon: 'trash',
          handler: () => {
            this.delete(item);
          },
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async showReportModal() {
    this.identifier_label = DisasterIncidents[this.item.identifier];

    const modal = await this.modalCtrl.create({
      component: SendReportComponent,
      componentProps: {
        identifier_id: this.item.identifier,
        identifier_label: this.identifier_label,
        item: this.item,
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

  ngOnInit() {}

  showOptions(item: any) {
    this.presentActionSheet(item);
  }

  delete(item: any) {
    this.store.dispatch(deleteReport({ uuid: item.uuid }));
  }
}
