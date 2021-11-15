import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { HazardMapEffects } from './hazard-map.effects';

describe('HazardMapEffects', () => {
  let actions$: Observable<any>;
  let effects: HazardMapEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HazardMapEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(HazardMapEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
