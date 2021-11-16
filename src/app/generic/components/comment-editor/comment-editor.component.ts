import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
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

  formGroup: FormGroup;

  constructor(
    public modalCtrl: ModalController,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.initForm();
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
    let data = { ...this.formGroup.value };

    if (this.item && this.item?.uuid) {
      this.store.dispatch(updateComment({ uuid: this.item.uuid, data: data }));
    } else {
      data = {
        ...data,
        content_type: this.content_type,
        object_id: this.object_id,
        parent: this.parent,
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
