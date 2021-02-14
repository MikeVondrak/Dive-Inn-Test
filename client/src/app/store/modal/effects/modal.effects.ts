import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { openModal, closeModal } from '../actions/modal.actions';


@Injectable()
export class ModalEffects {


  openModal$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(openModal),
      tap(() => {
        console.log('openModal');
      })
    );
  },
  {dispatch: false}
  );


  constructor(private actions$: Actions) {}

}
