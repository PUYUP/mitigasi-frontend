import { Component, Inject, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { personSelectSecurecode } from 'src/app/person/store/selectors/securecode/securecode.selectors';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-securecode-validation-dialog',
  templateUrl: './securecode-validation-dialog.component.html',
  styleUrls: ['./securecode-validation-dialog.component.css'],
})
export class SecurecodeValidationDialogComponent implements OnInit {
  @Input('data') data: any;

  securecode$: Observable<any> | undefined;
  private onDestroy$ = new Subject<void>();

  constructor(
    public modalController: ModalController,
    private store: Store<AppState>
  ) {
    this.securecode$ = this.store.pipe(select(personSelectSecurecode));
    this.securecode$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state: any) => {
        // if success return with passcode
        if (state?.data?.passcode) {
          this.modalController.dismiss(state?.data);
        }
      });
  }

  ngOnInit(): void {}

  cancel(): void {
    this.modalController.dismiss();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
