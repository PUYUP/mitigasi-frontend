import { TestBed } from '@angular/core/testing';

import { IsAnonGuard } from './isanon.guard';

describe('IsAnonGuard', () => {
  let guard: IsAnonGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsAnonGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
