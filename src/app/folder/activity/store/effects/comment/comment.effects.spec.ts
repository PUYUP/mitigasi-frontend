import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ActivityCommentEffects } from './comment.effects';

describe('ActivityCommentEffects', () => {
  let actions$: Observable<any>;
  let effects: ActivityCommentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityCommentEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(ActivityCommentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
