import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  createSecurecode,
  validateSecurecode,
} from 'src/app/person/store/actions/securecode/securecode.actions';
import { personSelectSecurecode } from 'src/app/person/store/selectors/securecode/securecode.selectors';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-securecode-validation',
  templateUrl: './securecode-validation.component.html',
  styleUrls: ['./securecode-validation.component.css'],
})
export class SecurecodeValidationComponent implements OnInit {
  @Input('token') token: string | undefined;
  @Input('challenge') challenge: string | undefined;
  @Input('issuer') issuer: string | undefined;

  securecode$: Observable<any> | undefined;
  formGroup: any = FormGroup;
  resendDelay: number = 30;
  resendTimer: number;

  private onDestroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.securecode$ = this.store.pipe(select(personSelectSecurecode));
    this.securecode$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state: any) => {
        if (state?.status == 'loaded' && state?.resend == true) {
          this.token = state?.data?.token;
        }
      });
  }

  ngOnInit(): void {
    this.initForm();
    this.startCountdown();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      passcode: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
  }

  onSubmit(): void {
    const data = {
      token: this.token,
      challenge: this.challenge,
    };

    this.store.dispatch(
      validateSecurecode({
        passcode: this.formGroup.value.passcode,
        data: data,
      })
    );
  }

  resend(): void {
    this.startCountdown(this.resendDelay);

    const data = {
      issuer: this.issuer,
      challenge: this.challenge,
    };

    this.store.dispatch(createSecurecode({ data: data, resend: true }));
  }

  startCountdown(seconds = this.resendDelay) {
    this.resendTimer = seconds;
    let counter = seconds;

    const interval = setInterval(() => {
      counter--;

      this.resendTimer = counter;

      if (counter < 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
