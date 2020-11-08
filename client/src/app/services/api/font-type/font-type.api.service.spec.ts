import { TestBed } from '@angular/core/testing';

import { FontType.ApiService } from '../../font-type.api.service';

describe('FontType.ApiService', () => {
  let service: FontType.ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontType.ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
