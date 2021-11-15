import { TestBed } from '@angular/core/testing';

import { HazardMapService } from './hazard-map.service';

describe('HazardMapService', () => {
  let service: HazardMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HazardMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
