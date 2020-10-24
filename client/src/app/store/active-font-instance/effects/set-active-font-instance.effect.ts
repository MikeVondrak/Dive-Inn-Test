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

  setActiveFontInstance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setActiveFontInstance),
      tap(action => {
        const logger = new LoggerService;
        logger.enableLogger(true, 'SetActiveFontInstanceEffect');        
        logger.log('action', action, undefined, 'SetActiveFontInstanceEffect');

        // change tap to map and remove dispatch false
        //  - what action to return?

        // select loadFontFamilyData
        // --> wait for fontFamilyReturned
        // dispatch fontFamilyReady
        



        // -- in other files
        // check if need to download font
        // download font
        // show loading state
        // loading complete / error handling 
        // update font style
    
      }),
      map(action => loadFontFamilyData({ family: action.fontInstance.family }))
    ),
    //{ dispatch: false }
  );
}