import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject, Subscription } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { Endpoints } from 'src/app/person/services/endpoint';
import {
  updateProfile,
  updateProfileSuccess,
} from 'src/app/person/store/actions/user/user.actions';
import { personSelectUser } from 'src/app/person/store/selectors/user/user.selectors';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  formGroup: any = FormGroup;
  user$: Observable<any> | undefined;
  private onDestroy$ = new Subject<void>();
  userData: any;
  token: string | undefined;
  allowAutoGrow: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private cookieService: CookieService,
    private http: HttpClient
  ) {
    this.user$ = this.store.pipe(select(personSelectUser));
    this.user$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      this.userData = state?.data;
      this.token = this.userData?.token?.access;
      this.cookieService.set('user', JSON.stringify(this.userData));
    });
  }

  ngOnInit(): void {
    this.initForm();

    // Set form value
    setTimeout(() => {
      this.formGroup.patchValue({
        first_name: this.userData?.user?.profile?.name,
        headline: this.userData?.user?.profile?.headline,
        about: this.userData?.user?.profile?.about,
      });
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.allowAutoGrow = true;
    }, 1000);
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(4)]],
      headline: [''],
      about: [''],
    });
  }

  onSubmit(): void {
    this.store.dispatch(
      updateProfile({
        hexid: this.userData?.user?.hexid,
        data: { ...this.formGroup.value },
      })
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
