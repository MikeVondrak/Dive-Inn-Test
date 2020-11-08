import { TestBed } from '@angular/core/testing';

import { FontTypeManagerService } from './font-type-manager.service';

describe('FontTypeManagerService', () => {
  let service: FontTypeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontTypeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
