import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SafetyCheckEditorComponent } from 'src/app/generic/components/safetycheck-editor/safetycheck-editor.component';
import { UserService } from 'src/app/person/services/user/user.service';
import { AttachmentImageViewerComponent } from 'src/app/shared/attachment-image-viewer/attachment-image-viewer.component';
import { AppState } from 'src/app/store/reducers';
import {
  deleteHazard,
  loadHazards,
  loadMoreHazards,
} from '../../store/actions/hazard/hazard.actions';
import { selectHazards } from '../../store/selectors/hazard/hazard.selectors';
import { ThreatClassify } from '../../threat.classify';
import { HazardEditorComponent } from '../hazard-editor/hazard-editor.component';

@Component({
  selector: 'app-hazard-list',
  templateUrl: './hazard-list.component.html',
  styleUrls: ['./hazard-list.component.scss'],
})
export class HazardListComponent implements OnInit {
  @Input('classify') classify: string;

  hazard$: Observable<any>;
  onDestroy$ = new Subject<void>();

  event: any;
  next: string;
  results: any = [];
  threatClassify: any;

  constructor(
    private store: Store<AppState>,
    private userService: UserService,
    private router: Router,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController
  ) {
    this.hazard$ = this.store.pipe(select(selectHazards));
    this.hazard$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        this.next = state?.data?.next;
        this.results = state?.data?.results;
      }

      if (this.event) this.event.target.complete();
    });
  }

  async _presentOptions(item: any = {}) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Tindakan',
      buttons: [
        {
          text: 'Edit',
          icon: 'create-outline',
          handler: () => {
            this._showHazardEditor(item);
          },
        },
        {
          text: 'Hapus',
          icon: 'trash',
          handler: () => {
            this.deleteItem(item?.uuid);
          },
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async _showHazardEditor(item: any) {
    const dialog = await this.modalCtrl.create({
      component: HazardEditorComponent,
      backdropDismiss: false,
      componentProps: {
        item: item,
      },
    });

    await dialog.present();
  }

  async _showSafetyCheckEditor(
    hazardUuid: string,
    item: any,
    condition: string
  ) {
    const dialog = await this.modalCtrl.create({
      component: SafetyCheckEditorComponent,
      backdropDismiss: false,
      componentProps: {
        hazard_uuid: hazardUuid,
        item: item,
        condition: condition,
      },
    });

    await dialog.present();
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
    this.threatClassify = ThreatClassify;
    this.store.dispatch(loadHazards({ classify: this.classify }));
  }

  onRefresh(event: any, classify: any = null) {
    this.event = event;
    this.classify = classify;

    this.store.dispatch(loadHazards({ classify: this.classify }));
  }

  /**
   * Open options
   */
  showOptions(item: any) {
    this._presentOptions(item);
  }

  /**
   * Open safetycheck editor
   */
  openSafetyCheckEditor(hazardUuid: string, item: any, condition: string) {
    if (this.userService.token) {
      this._showSafetyCheckEditor(hazardUuid, item, condition);
    } else {
      this.router.navigate(['/SignIn']);
    }
  }

  /**
   * Open attachment image viewer
   */
  openAttachmentImageViewer(attachments: any, current: any) {
    this._showAttachmentImageViewer(attachments, current);
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
        })
      );
    }
  }

  deleteItem(uuid: string) {
    this.store.dispatch(deleteHazard({ uuid: uuid }));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
