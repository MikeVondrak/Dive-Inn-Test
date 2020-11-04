import { TestBed } from '@angular/core/testing';

import { FontSet.ApiService } from './font-set.api.service';

describe('FontSet.ApiService', () => {
  let service: FontSet.ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontSet.ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
