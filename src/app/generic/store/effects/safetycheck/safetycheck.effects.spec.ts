import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SafetyCheckEffects } from './safetycheck.effects';

describe('SafetyCheckEffects', () => {
  let actions$: Observable<any>;
  let effects: SafetyCheckEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SafetyCheckEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(SafetyCheckEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
