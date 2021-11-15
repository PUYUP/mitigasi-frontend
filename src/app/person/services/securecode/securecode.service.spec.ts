import { TestBed } from '@angular/core/testing';

import { SecurecodeService } from './securecode.service';

describe('SecurecodeService', () => {
  let service: SecurecodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurecodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
