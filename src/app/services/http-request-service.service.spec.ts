import { TestBed } from '@angular/core/testing';

import { HttpRequestServiceService } from './http-request-service.service';

describe('HttpRequestServiceService', () => {
  let service: HttpRequestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRequestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
