import { TestBed } from '@angular/core/testing';

import { FontInstanceManagerService } from './font-instance-manager.service';

describe('FontInstanceManagerService', () => {
  let service: FontInstanceManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontInstanceManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
