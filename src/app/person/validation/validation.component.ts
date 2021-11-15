import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { createSecurecode } from '../store/actions/securecode/securecode.actions';
import { personSelectSecurecode } from '../store/selectors/securecode/securecode.selectors';

import { AppState } from 'src/app/store/reducers';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css'],
})
export class ValidationComponent implements OnInit {
  token: string | undefined;
  challenge: string | undefined;
  issuer: string | undefined;

  securecode$: Observable<any> | undefined;
  private onDestroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.securecode$ = this.store.pipe(select(personSelectSecurecode));
    this.securecode$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state: any) => {
        if (state?.status == 'loaded') {
          this.token = state?.data?.token;
        }
      });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || undefined;
    this.challenge =
      this.route.snapshot.queryParamMap.get('challenge') || undefined;
    this.issuer = this.route.snapshot.queryParamMap.get('issuer') || undefined;
  }

  resend(): void {
    const data = {
      issuer: this.issuer,
      challenge: this.challenge,
    };

    this.store.dispatch(createSecurecode({ data: data }));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
