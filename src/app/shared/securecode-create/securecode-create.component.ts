import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { createSecurecode } from 'src/app/person/store/actions/securecode/securecode.actions';
import { personSelectSecurecode } from 'src/app/person/store/selectors/securecode/securecode.selectors';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-securecode-create',
  templateUrl: './securecode-create.component.html',
  styleUrls: ['./securecode-create.component.css'],
})
export class SecurecodeCreateComponent implements OnInit {
  @Input('challenge') challenge: string | undefined;

  public formGroup: any = FormGroup;
  public securecode$: Observable<any> | undefined;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.securecode$ = this.store.pipe(select(personSelectSecurecode));
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      issuer: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    let data = {
      ...this.formGroup.value,
      challenge: this.challenge,
    };

    this.store.dispatch(createSecurecode({ data: data }));
  }
}
