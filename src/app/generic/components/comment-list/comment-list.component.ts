import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/store/reducers';
import {
  deleteComment,
  loadComments,
  loadMoreComments,
} from '../../store/actions/comment/comment.actions';
import { selectComments } from '../../store/selectors/comment/comment.selectors';
import { CommentEditorComponent } from '../comment-editor/comment-editor.component';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input('content_type') content_type: string;
  @Input('object_id') object_id: string;
  @Input('parent') parent: string;

  comment$: Observable<any>;
  onDestroy$ = new Subject<void>();

  event: any;
  next: string;

  constructor(
    private store: Store<AppState>,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController
  ) {
    this.comment$ = this.store.pipe(select(selectComments));
    this.comment$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        this.next = state?.data?.next;
      }

      if (this.event) this.event.target.complete();
    });
  }

  async _showCommentEditor(hazard: any, item: any = {}) {
    const dialog = await this.modalCtrl.create({
      component: CommentEditorComponent,
      backdropDismiss: false,
      componentProps: {
        item: item,
      },
    });

    await dialog.present();
  }

  async _showReplyEditor(parent: string) {
    const dialog = await this.modalCtrl.create({
      component: CommentEditorComponent,
      backdropDismiss: false,
      componentProps: {
        object_id: this.object_id,
        content_type: this.content_type,
        parent: parent,
      },
    });

    await dialog.present();
  }

  async _presentDeleteConfirm(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
      message: 'Apakah yakin menghapus komentar ini?',
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
            this.store.dispatch(deleteComment({ uuid: item.uuid }));
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {
    this.store.dispatch(
      loadComments({
        content_type: this.content_type,
        object_id: this.object_id,
        parent: this.parent,
      })
    );
  }

  onInfinite(event: any) {
    this.event = event;

    if (this.next) {
      this.store.dispatch(
        loadMoreComments({
          next: this.next,
          content_type: this.content_type,
          object_id: this.object_id,
          parent: this.parent,
        })
      );
    }
  }

  openCommentEditor(item: any) {
    this._showCommentEditor(null);
  }

  openReplyEditor(parent: string) {
    this._showReplyEditor(parent);
  }

  delete(item: any) {
    this._presentDeleteConfirm(item);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
