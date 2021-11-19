import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ActionsSubject, Store } from '@ngrx/store';
import { skip } from 'rxjs/operators';
import { AppState } from 'src/app/store/reducers';
import {
  createComment,
  updateComment,
} from '../../store/actions/comment/comment.actions';

@Component({
  selector: 'app-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss'],
})
export class CommentEditorComponent implements OnInit {
  @Input('content_type') content_type: any;
  @Input('object_id') object_id: any;
  @Input('item') item: any;
  @Input('parent') parent: any;
  @Input('from') from: string;

  formGroup: FormGroup;
  isLoading: boolean = false;

  constructor(
    public modalCtrl: ModalController,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private actionListener$: ActionsSubject
  ) {}

  ngOnInit() {
    this.initForm();

    this.actionListener$.pipe(skip(1)).subscribe((action) => {
      if (
        action.type == '[Comment] Create Comment Success' ||
        action.type == '[Comment] Update Comment Success' ||
        action.type == '[Comment] Create Comment Failure'
      ) {
        this.formGroup.reset();
        this.isLoading = false;
      }

      this.modalCtrl.getTop().then((v: any) => {
        if (
          v &&
          (action.type == '[Comment] Create Comment Success' ||
            action.type == '[Comment] Update Comment Success')
        ) {
          this.modalCtrl.dismiss();
        }
      });
    });
  }

  /**
   * Build form
   */
  private initForm() {
    this.formGroup = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
    });

    if (this.item) {
      this.formGroup.patchValue({
        description: this.item?.description,
      });
    }
  }

  onSubmit() {
    this.isLoading = true;

    let data = { ...this.formGroup.value };

    if (this.item && this.item?.uuid) {
      this.store.dispatch(updateComment({ uuid: this.item.uuid, data: data }));
    } else {
      data = {
        ...data,
        content_type: this.content_type,
        object_id: this.object_id,
        parent: this.parent,
        from: this.from,
      };

      this.store.dispatch(createComment({ data: data }));
    }
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dimissed: true,
    });
  }
}
