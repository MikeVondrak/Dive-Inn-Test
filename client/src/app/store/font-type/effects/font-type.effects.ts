import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as FontTypeActions from '../actions/font-type.actions';



@Injectable()
export class FontTypeEffects {

  loadFontTypes$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(FontTypeActions.loadFontTypes),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => FontTypeActions.loadFontTypesSuccess({ data })),
          catchError(error => of(FontTypeActions.loadFontTypesFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
