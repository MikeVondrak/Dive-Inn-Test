import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FontTypeEffects } from './font-type.effects';

describe('FontTypeEffects', () => {
  let actions$: Observable<any>;
  let effects: FontTypeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FontTypeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(FontTypeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
