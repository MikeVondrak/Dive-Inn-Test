import { TestBed } from '@angular/core/testing';

import { FontApiService } from './font.api.service';

describe('FontApiService', () => {
  let service: FontApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
