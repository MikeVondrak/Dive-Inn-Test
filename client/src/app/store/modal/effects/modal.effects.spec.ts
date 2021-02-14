import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ModalEffects } from './modal.effects';

describe('ModalEffects', () => {
  let actions$: Observable<any>;
  let effects: ModalEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModalEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ModalEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
