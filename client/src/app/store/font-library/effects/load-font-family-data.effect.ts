import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { delay, map, tap } from 'rxjs/operators';

import { loadFontFamilyData, fontFamilyDataLoaded } from '../actions/font-library.actions';

@Injectable()
export class LoadFontFamilyDataEffect {
  constructor(
    private actions$: Actions,
    
  ) {}

  loadFontFamilyData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFontFamilyData),
      tap(action => {
        console.log('------- loadFontFamilyData Effect: ' + JSON.stringify(action, null, 4));

        // What to do to get new font data here?
    
      }),
      delay(2000), // REMOVE THIS!!!!!
      map(action => fontFamilyDataLoaded())
    ),
  );
}