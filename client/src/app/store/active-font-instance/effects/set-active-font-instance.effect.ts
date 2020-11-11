import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, tap } from 'rxjs/operators';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { loadFontFamilyData } from '../../font-library/actions/font-library.actions';
import { setActiveFontInstance } from '../actions/active-font-instance.actions';

@Injectable({
  providedIn: 'root'
})
export class SetActiveFontInstanceEffect {
  constructor(
    private actions$: Actions,
    
  ) {}


  // logic moved to FontLibrary
  setActiveFontInstance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setActiveFontInstance),
      tap(action => {
        const logger = new LoggerService;
        logger.enableLogger(true, 'SetActiveFontInstanceEffect');        
        logger.log('action', action, undefined, 'SetActiveFontInstanceEffect');
      }),
    ),
    { dispatch: false }
  );
}