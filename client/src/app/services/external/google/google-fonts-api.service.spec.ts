import { TestBed } from '@angular/core/testing';

import { GoogleFontsApiService } from './google-fonts-api.service';

describe('GoogleFontsApiService', () => {
  let service: GoogleFontsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleFontsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
