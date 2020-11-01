import { TestBed } from '@angular/core/testing';

import { FontInstanceApiService } from './font-instance.api.service';

describe('FontInstance.ApiService', () => {
  let service: FontInstanceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontInstanceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
