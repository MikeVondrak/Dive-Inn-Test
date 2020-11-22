import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, tap } from 'rxjs/operators';
import { defaultFontInstance } from 'src/app/models/font-instance.model';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { setActiveFontInstance } from '../../active-font-instance/actions/active-font-instance.actions';
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
      map(action => setActiveFontInstance({fontInstance: defaultFontInstance}))
    
      // This will fire on App init
      // TODO: load TypeInstanceLoaders in a blank state so a new set can be created
      // and set the initial ActiveFontInstance to the instance matching the defaultFontInstanceType const from FontSet model
      
    ),
    //{ dispatch: false }
  );
}