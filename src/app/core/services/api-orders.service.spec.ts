import { TestBed } from '@angular/core/testing';

import { ApiOrdersService } from './api-orders.service';

describe('ApiOrdersService', () => {
  let service: ApiOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
