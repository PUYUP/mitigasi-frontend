import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PersonUserEffects } from './user.effects';

describe('PersonUserEffects', () => {
  let actions$: Observable<any>;
  let effects: PersonUserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonUserEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(PersonUserEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
