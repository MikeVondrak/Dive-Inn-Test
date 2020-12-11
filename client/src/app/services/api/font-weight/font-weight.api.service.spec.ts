import { TestBed } from '@angular/core/testing';

import { FontWeightApiService } from './font-weight.api.service';

describe('FontWeightApiService', () => {
  let service: FontWeightApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontWeightApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
