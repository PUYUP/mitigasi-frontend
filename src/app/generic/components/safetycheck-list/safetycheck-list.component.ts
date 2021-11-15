import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AttachmentImageViewerComponent } from 'src/app/shared/attachment-image-viewer/attachment-image-viewer.component';
import { AppState } from 'src/app/store/reducers';
import {
  deleteSafetyCheck,
  loadMoreSafetyChecks,
  loadSafetyChecks,
} from '../../store/actions/safetycheck/safetycheck.actions';
import { selectSafetyChecks } from '../../store/selectors/safetycheck/safetycheck.selectors';
import { SafetyCheckEditorComponent } from '../safetycheck-editor/safetycheck-editor.component';

@Component({
  selector: 'app-safetycheck-list',
  templateUrl: './safetycheck-list.component.html',
  styleUrls: ['./safetycheck-list.component.scss'],
})
export class SafetyCheckListComponent implements OnInit {
  @Input('content_type') contentType: string;
  @Input('object_id') objectId: string;

  safetycheck$: Observable<any>;
  onDestroy$ = new Subject<void>();

  event: any;
  next: string;

  constructor(
    private store: Store<AppState>,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {
    this.safetycheck$ = this.store.pipe(select(selectSafetyChecks));
    this.safetycheck$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state: any) => {
        if (state?.status == 'loaded') {
          this.next = state?.data?.next;
        }

        if (this.event) this.event.target.complete();
      });
  }

  async _showSafetyCheckEditor(item: any) {
    const dialog = await this.modalCtrl.create({
      component: SafetyCheckEditorComponent,
      backdropDismiss: false,
      componentProps: {
        item: item,
        condition: item?.condition,
      },
    });

    await dialog.present();
  }

  async _presentDeleteConfirm(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
      message: 'Data dihapus selamanya. Apakah Anda yakin?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Ya, Hapus',
          handler: () => {
            this.store.dispatch(deleteSafetyCheck({ uuid: item?.uuid }));
          },
        },
      ],
    });

    await alert.present();
  }

  async _showAttachmentImageViewer(attachments: any = [], current: any) {
    const dialog = await this.modalCtrl.create({
      component: AttachmentImageViewerComponent,
      backdropDismiss: true,
      componentProps: {
        attachments: attachments,
        current: current,
      },
    });

    await dialog.present();
  }

  ngOnInit() {
    this.store.dispatch(
      loadSafetyChecks({
        content_type: this.contentType,
        object_id: this.objectId,
      })
    );
  }

  openEditor(item: any) {
    this._showSafetyCheckEditor(item);
  }

  openDelete(item: any) {
    this._presentDeleteConfirm(item);
  }

  /**
   * Open attachment image viewer
   */
  openAttachmentImageViewer(attachments: any, current: any) {
    this._showAttachmentImageViewer(attachments, current);
  }

  onInfinite(event: any) {
    this.event = event;

    if (this.next) {
      this.store.dispatch(
        loadMoreSafetyChecks({
          next: this.next,
          content_type: this.contentType,
          object_id: this.objectId,
        })
      );
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
