import { TestBed } from '@angular/core/testing';

import { SafetyCheckMapService } from './safetycheck-map.service';

describe('SafetyCheckMapService', () => {
  let service: SafetyCheckMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SafetyCheckMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
