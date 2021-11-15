import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SafetyCheckMapEffects } from './safetycheck-map.effects';

describe('SafetyCheckMapEffects', () => {
  let actions$: Observable<any>;
  let effects: SafetyCheckMapEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SafetyCheckMapEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(SafetyCheckMapEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
