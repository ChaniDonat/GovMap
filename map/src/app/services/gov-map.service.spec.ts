import { TestBed } from '@angular/core/testing';

import { GovMapService } from './gov-map.service';

describe('GovMapService', () => {
  let service: GovMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GovMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
