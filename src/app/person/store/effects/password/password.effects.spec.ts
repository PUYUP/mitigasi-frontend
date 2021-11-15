import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PersonPasswordEffects } from './password.effects';

describe('PersonPasswordEffects', () => {
  let actions$: Observable<any>;
  let effects: PersonPasswordEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonPasswordEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(PersonPasswordEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
