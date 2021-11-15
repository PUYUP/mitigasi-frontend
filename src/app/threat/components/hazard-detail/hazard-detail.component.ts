import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { CommentEditorComponent } from 'src/app/generic/components/comment-editor/comment-editor.component';
import { SafetyCheckEditorComponent } from 'src/app/generic/components/safetycheck-editor/safetycheck-editor.component';
import { SafetyCheckListMapComponent } from 'src/app/generic/components/safetycheck-list-map/safetycheck-list-map.component';
import { selectSafetyChecks } from 'src/app/generic/store/selectors/safetycheck/safetycheck.selectors';
import { UserService } from 'src/app/person/services/user/user.service';
import { AttachmentImageViewerComponent } from 'src/app/shared/attachment-image-viewer/attachment-image-viewer.component';
import { AppState } from 'src/app/store/reducers';
import {
  deleteHazard,
  loadHazard,
  resetHazard,
} from '../../store/actions/hazard/hazard.actions';
import { selectHazard } from '../../store/selectors/hazard/hazard.selectors';
import { HazardDetailMapComponent } from '../hazard-detail-map/hazard-detail-map.component';
import { HazardEditorComponent } from '../hazard-editor/hazard-editor.component';

@Component({
  selector: 'app-hazard-detail',
  templateUrl: './hazard-detail.component.html',
  styleUrls: ['./hazard-detail.component.scss'],
})
export class HazardDetailComponent implements OnInit {
  @ViewChild(HazardDetailMapComponent) map: HazardDetailMapComponent;

  hazardClassify: string;
  hazardUuid: string;
  showMapButton: boolean = false;

  hazard$: Observable<any>;
  safetycheck$: Observable<any>;
  onDestroy$ = new Subject<void>();

  segmentSelected: string = 'list';

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private userService: UserService,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    private actionListener$: ActionsSubject,
    private location: Location
  ) {
    this.hazard$ = this.store.pipe(select(selectHazard({})));
    this.safetycheck$ = this.store.pipe(select(selectSafetyChecks));
    this.safetycheck$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state: any) => {
        if (state?.data?.results?.length > 0) {
          this.showMapButton = true;
        }
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
    await dialog.onDidDismiss().then((data: any) => {
      this.map.reloadMap(data?.data);
    });
  }

  async _showCommentEditor(hazard: any, item: any = {}) {
    const dialog = await this.modalCtrl.create({
      component: CommentEditorComponent,
      backdropDismiss: false,
      componentProps: {
        content_type: 'hazard',
        object_id: hazard.uuid,
        item: item,
      },
    });

    await dialog.present();
  }

  async _openSafetyCheckEditor(
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

  async _openSafetyCheckMap() {
    const dialog = await this.modalCtrl.create({
      component: SafetyCheckListMapComponent,
      backdropDismiss: false,
      componentProps: {
        content_type: 'hazard',
        object_id: this.hazardUuid,
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
    this.hazardClassify = this.route.snapshot.paramMap.get('hazard_classify');
    this.hazardUuid = this.route.snapshot.paramMap.get('hazard_uuid');

    this.store.dispatch(loadHazard({ uuid: this.hazardUuid }));

    this.actionListener$
      .pipe(
        skip(1) // optional: skips initial logging done by ngrx
      )
      .subscribe((action) => {
        if (action.type == '[Hazard] Delete Hazard Success') {
          if (this.router.navigated) {
            this.location.back();
          } else {
            this.router.navigate(['/Home']);
          }
        }
      });
  }

  ionViewWillLeave() {
    this.store.dispatch(resetHazard());
  }

  showOptions(item: any) {
    this._presentOptions(item);
  }

  leaveComment(hazard: any) {
    this._showCommentEditor(hazard);
  }

  /**
   * Open safetycheck editor
   */
  openSafetyCheckEditor(hazardUuid: string, item: any, condition: string) {
    if (this.userService.token) {
      this._openSafetyCheckEditor(hazardUuid, item, condition);
    } else {
      this.router.navigate(['/SignIn']);
    }
  }

  /**
   * Show list or map segment
   */
  segmentChanged(event: any) {
    this.segmentSelected = event.detail.value;
  }

  /**
   * Open safetychek map
   */
  openSafetyCheckMap() {
    this._openSafetyCheckMap();
  }

  /**
   * Open attachment image viewer
   */
  openAttachmentImageViewer(attachments: any, current: any) {
    this._showAttachmentImageViewer(attachments, current);
  }

  deleteItem(uuid: string) {
    this.store.dispatch(deleteHazard({ uuid: uuid }));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
