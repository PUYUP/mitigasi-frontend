import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonContent, ModalController } from '@ionic/angular';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { UserService } from 'src/app/person/services/user/user.service';
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
  @ViewChild(IonContent, { static: false }) content: IonContent;

  comment$: Observable<any>;
  onDestroy$ = new Subject<void>();
  contentType: string = 'hazard';
  objectId: string = '';
  token: any = null;

  event: any;
  next: string;
  loadingPrevious: boolean = false;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private actionListener$: ActionsSubject,
    private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService
  ) {
    this.comment$ = this.store.pipe(select(selectComments));
    this.comment$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        this.next = state?.data?.next;
        this.loadingPrevious = false;
      }

      if (this.event) this.event.target.complete();
    });
  }

  async _showCommentEditor(item: any = {}) {
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
        object_id: this.objectId,
        content_type: this.contentType,
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
    this.objectId = this.route.snapshot.paramMap.get('hazard_uuid');
    this.token = this.userService.token;

    this.store.dispatch(
      loadComments({
        content_type: this.contentType,
        object_id: this.objectId,
      })
    );

    this.actionListener$.pipe(skip(1)).subscribe((action: any) => {
      if (action.type == '[Comment] Create Comment Success') {
        setTimeout(() => {
          this.content.scrollToBottom();
        }, 10);
      }

      if (action.type == '[Comment] Delete Comment Success') {
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  onInfinite(event: any) {
    this.event = event;

    if (this.next) {
      this.store.dispatch(
        loadMoreComments({
          next: this.next,
          content_type: this.contentType,
          object_id: this.objectId,
        })
      );
    }
  }

  loadPrevious() {
    this.loadingPrevious = true;

    this.store.dispatch(
      loadMoreComments({
        next: this.next,
        content_type: this.contentType,
        object_id: this.objectId,
      })
    );
  }

  openCommentEditor(item: any) {
    this._showCommentEditor(item);
  }

  openReplyEditor(parent: string) {
    this._showReplyEditor(parent);
  }

  delete(item: any) {
    this._presentDeleteConfirm(item);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.changeDetectorRef.detach();
  }
}
