import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  createSecurecode,
  resetSecurecode,
} from 'src/app/person/store/actions/securecode/securecode.actions';
import { updateUser } from 'src/app/person/store/actions/user/user.actions';
import { personSelectSecurecode } from 'src/app/person/store/selectors/securecode/securecode.selectors';
import { personSelectUser } from 'src/app/person/store/selectors/user/user.selectors';
import { SecurecodeValidationDialogComponent } from 'src/app/shared/securecode-validation-dialog/securecode-validation-dialog.component';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-security-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  userData$: Observable<any> | undefined;
  securecode$: Observable<any> | undefined;
  private onDestroy$ = new Subject<void>();

  user: any;
  username: string | undefined;
  msisdn: string | undefined;
  securecodeStatus: string | undefined;

  constructor(
    private store: Store<AppState>,
    public modalController: ModalController
  ) {
    // Listening user...
    this.userData$ = this.store.pipe(select(personSelectUser));
    this.userData$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status != 'loading') {
        this.user = state?.data?.user;
        this.username = this.user?.username;
        this.msisdn = this.user?.msisdn;
      }
    });

    // Listening securecode
    this.securecode$ = this.store.pipe(select(personSelectSecurecode));
    this.securecode$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state: any) => {
        let isVerified = state?.data?.is_verified;
        let challenge = state?.data?.challenge;
        let resend = state?.resend;

        let showDialog =
          challenge == 'change_msisdn' || challenge == 'change_msisdn';

        if (
          state?.status != 'loading' &&
          showDialog &&
          !isVerified &&
          !resend
        ) {
          this.validateSecurecodeDialog(state?.data);
        }

        this.securecodeStatus = state?.status;
      });
  }

  ngOnInit(): void {}

  async validateSecurecodeDialog(data: any) {
    const modal = await this.modalController.create({
      component: SecurecodeValidationDialogComponent,
      componentProps: {
        data: data,
      },
    });

    modal.onDidDismiss().then((result: any) => {
      if (result?.data?.passcode && result?.data?.is_verified) {
        let issuer = result?.data?.issuer;
        let issuerType = result?.data?.issuer_type;

        let data = {
          [issuerType]: issuer,
          validation: {
            passcode: result?.data?.passcode,
            token: result?.data?.token,
            challenge: result?.data?.challenge,
          },
        };

        this.store.dispatch(
          updateUser({ hexid: this.user?.hexid, data: data })
        );
      } else {
        this.msisdn = this.user?.msisdn;
      }

      this.store.dispatch(resetSecurecode());
    });

    return await modal.present();
  }

  usernameChange(event: any): void {
    if (event.value) this.username = event.value;
  }

  msisdnChange(event: any): void {
    if (event.value) this.msisdn = event.value;
  }

  securitySave(field: string) {
    let data = {};

    if (field === 'msisdn') {
      data = {
        issuer: this.msisdn,
        challenge: 'change_msisdn',
      };

      return this.store.dispatch(createSecurecode({ data: data }));
    } else {
      data = { username: this.username };
    }

    return this.store.dispatch(
      updateUser({ hexid: this.user?.hexid, data: data })
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
