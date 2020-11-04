import { TestBed } from '@angular/core/testing';

import { FontSetManagerService } from './font-set-manager.service';

describe('FontSetManagerService', () => {
  let service: FontSetManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontSetManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
