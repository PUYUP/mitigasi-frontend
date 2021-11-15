import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { HazardEffects } from './hazard.effects';

describe('HazardEffects', () => {
  let actions$: Observable<any>;
  let effects: HazardEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HazardEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(HazardEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
