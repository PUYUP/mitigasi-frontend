import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { createComment } from 'src/app/contribution/store/actions/comment/comment.actions';
import { selectComments } from 'src/app/contribution/store/selectors/comment/comment.selectors';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-send-comment',
  templateUrl: './send-comment.component.html',
  styleUrls: ['./send-comment.component.scss'],
})
export class SendCommentComponent implements OnInit {
  @Input('applied_uuid') applied_uuid: string;
  @Input('applied_model') applied_model: string;

  formGroup: any = FormGroup;
  comment$: Observable<any>;
  onDestroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.comment$ = this.store.pipe(select(selectComments));
    this.comment$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        if (this.formGroup) this.formGroup.reset();
      }
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    let data = {
      ...this.formGroup.value,
      applied_model: this.applied_model,
      applied_uuid: this.applied_uuid,
    };

    this.store.dispatch(createComment({ data: data }));
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
