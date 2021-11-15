import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DisasterEffects } from './disaster.effects';

describe('DisasterEffects', () => {
  let actions$: Observable<any>;
  let effects: DisasterEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DisasterEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(DisasterEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
