import { TestBed } from '@angular/core/testing';

import { HeadUriLoaderService } from './head-uri-loader.service';

describe('HeadUriLoaderService', () => {
  let service: HeadUriLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeadUriLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
