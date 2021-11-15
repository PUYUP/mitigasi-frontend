import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import {
  getUserFromCookie,
  signinUser,
} from '../store/actions/user/user.actions';
import { personSelectUser } from '../store/selectors/user/user.selectors';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  user$: Observable<any> | undefined;
  formGroup: any = FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.user$ = this.store.pipe(select(personSelectUser));
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    this.store.dispatch(signinUser({ data: this.formGroup.value }));
  }
}
