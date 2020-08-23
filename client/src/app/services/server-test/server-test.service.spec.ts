import { TestBed } from '@angular/core/testing';

import { ServerTestService } from './server-test.service';

describe('ServerTestService', () => {
  let service: ServerTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
