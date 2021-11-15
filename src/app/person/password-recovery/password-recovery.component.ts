import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { recoveryPassword } from '../store/actions/password/password.actions';
import { personSelectPassword } from '../store/selectors/password/password.selectors';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css'],
})
export class PasswordRecoveryComponent implements OnInit {
  formGroup: any = FormGroup;
  password_token: string | undefined;
  password_uidb64: string | undefined;
  token: string | undefined;
  passcode: string | undefined;
  challenge: string | undefined;
  showedPassword: boolean = false;

  password$: Observable<any> | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.password$ = this.store.pipe(select(personSelectPassword));
  }

  ngOnInit(): void {
    this.initForm();

    this.password_token =
      this.route.snapshot.queryParamMap.get('password_token') || undefined;
    this.password_uidb64 =
      this.route.snapshot.queryParamMap.get('password_uidb64') || undefined;
    this.token = this.route.snapshot.queryParamMap.get('token') || undefined;
    this.passcode =
      this.route.snapshot.queryParamMap.get('passcode') || undefined;
    this.challenge =
      this.route.snapshot.queryParamMap.get('challenge') || undefined;
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      retype_password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    const data = {
      ...this.formGroup.value,
      token: this.password_token,
      uidb64: this.password_uidb64,
      validation: {
        token: this.token,
        passcode: this.passcode,
        challenge: this.challenge,
      },
    };

    this.store.dispatch(recoveryPassword({ data: data }));
  }

  showPassword() {
    this.showedPassword = !this.showedPassword;
    console.log(this.showedPassword);
  }
}
