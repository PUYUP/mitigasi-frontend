import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PersonSecurecodeEffects } from './securecode.effects';

describe('PersonSecurecodeEffects', () => {
  let actions$: Observable<any>;
  let effects: PersonSecurecodeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonSecurecodeEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(PersonSecurecodeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
