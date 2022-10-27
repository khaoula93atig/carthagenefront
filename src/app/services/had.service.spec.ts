import { TestBed } from '@angular/core/testing';

import { HadService } from './had.service';

describe('HadService', () => {
  let service: HadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
