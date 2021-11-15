import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ActivitySafetyCheckEffects } from './safetycheck.effects';

describe('ActivitySafetyCheckEffects', () => {
  let actions$: Observable<any>;
  let effects: ActivitySafetyCheckEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActivitySafetyCheckEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(ActivitySafetyCheckEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
