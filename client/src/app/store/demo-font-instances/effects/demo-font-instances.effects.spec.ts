import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DemoFontInstancesEffects } from './demo-font-instances.effects';

describe('DemoFontInstancesEffects', () => {
  let actions$: Observable<any>;
  let effects: DemoFontInstancesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DemoFontInstancesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(DemoFontInstancesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
