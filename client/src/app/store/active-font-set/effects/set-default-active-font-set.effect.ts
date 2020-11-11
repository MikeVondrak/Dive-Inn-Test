import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, tap } from 'rxjs/operators';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { loadFontFamilyData } from '../../font-library/actions/font-library.actions';
import { setDefaultActiveFontSet } from '../actions/active-font-set.actions';

@Injectable({
  providedIn: 'root'
})
export class SetDefaultActiveFontSetEffect {
  constructor(
    private actions$: Actions,
    
  ) {}

  setDefaultActiveFontSet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setDefaultActiveFontSet),
      tap(action => {
        const logger = new LoggerService;
        logger.enableLogger(true, 'SetDefaultActiveFontSetEffect');        
        logger.log('action', action, undefined, 'SetDefaultActiveFontSetEffect');    
      }),
      //map(action => loadFontFamilyData({ family: action.fontInstance.family }))
    ),
    { dispatch: false }
  );
}