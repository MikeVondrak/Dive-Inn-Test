import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FontWeightEffects } from './load-font-weights.effect';

describe('FontWeightEffects', () => {
  let actions$: Observable<any>;
  let effects: FontWeightEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FontWeightEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(FontWeightEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
