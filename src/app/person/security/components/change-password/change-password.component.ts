import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changePassword } from 'src/app/person/store/actions/user/user.actions';
import { personSelectUser } from 'src/app/person/store/selectors/user/user.selectors';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  userData$: Observable<any> | undefined;
  changePasswordForm: any = FormGroup;
  showedPassword: boolean = false;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.userData$ = this.store.pipe(select(personSelectUser));
  }

  ngOnInit(): void {
    this.initChangePasswordForm();
  }

  initChangePasswordForm(): void {
    this.changePasswordForm = this.fb.group({
      current_password: ['', [Validators.required, Validators.minLength(6)]],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      retype_password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  showPassword() {
    this.showedPassword = !this.showedPassword;
  }

  onSubmit(hexid: string): void {
    this.store.dispatch(
      changePassword({
        hexid: hexid,
        data: { ...this.changePasswordForm.value },
      })
    );
  }
}
