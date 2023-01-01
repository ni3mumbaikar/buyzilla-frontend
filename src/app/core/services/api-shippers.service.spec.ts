import { TestBed } from '@angular/core/testing';

import { ApiShippersService } from './api-shippers.service';

describe('ApiShippersService', () => {
  let service: ApiShippersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiShippersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
