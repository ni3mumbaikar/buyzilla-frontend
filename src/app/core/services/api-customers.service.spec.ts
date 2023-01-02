import { TestBed } from '@angular/core/testing';

import { ApiCustomersService } from './api-customers.service';

describe('ApiCustomersService', () => {
  let service: ApiCustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
