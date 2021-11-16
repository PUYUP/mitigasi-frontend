import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { signinUser, signupUser } from '../store/actions/user/user.actions';
import { personSelectUser } from '../store/selectors/user/user.selectors';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  token: string | undefined;
  challenge: string | undefined;
  issuer: string | undefined;
  passcode: string | undefined;
  showedPassword: boolean = false;

  formGroup: any = FormGroup;
  user$: Observable<any> | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.user$ = this.store.pipe(select(personSelectUser));
  }

  ngOnInit(): void {
    this.passcode =
      this.route.snapshot.queryParamMap.get('passcode') || undefined;
    this.token = this.route.snapshot.queryParamMap.get('token') || undefined;
    this.challenge =
      this.route.snapshot.queryParamMap.get('challenge') || undefined;
    this.issuer = this.route.snapshot.queryParamMap.get('issuer') || undefined;

    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      msisdn: [{ value: this.issuer, disabled: false }],
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      retype_password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    const data = {
      ...this.formGroup.value,
      validation: {
        passcode: this.passcode,
        token: this.token,
        challenge: this.challenge,
      },
    };

    this.store.dispatch(signupUser({ data: data }));
  }

  showPassword(): void {
    this.showedPassword = !this.showedPassword;
  }
}
