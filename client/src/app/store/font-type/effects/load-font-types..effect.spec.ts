import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LoadFontTypesEffect } from './load-font-types.effect';

describe('FontTypeEffects', () => {
  let actions$: Observable<any>;
  let effects: LoadFontTypesEffect;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoadFontTypesEffect,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(LoadFontTypesEffect);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
