import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { delay, map, tap } from 'rxjs/operators';
import { LoggerService } from 'src/app/services/logger/logger.service';

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
        // const logger = new LoggerService;
        // logger.enableLogger(true, 'LoadFontFamilyDataEffect');        
        // logger.log('action', action, undefined, 'LoadFontFamilyDataEffect');

        // What to do to get new font data here?
    
      }),
      delay(500), // REMOVE THIS!!!!!
      map(action => fontFamilyDataLoaded())
    ),
  );
}