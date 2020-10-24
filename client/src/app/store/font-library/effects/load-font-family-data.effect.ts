import { Injectable } from "@angular/core";
 import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { combineLatest, delay, filter, map, concatMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { FontManagerService } from 'src/app/services/font-manager.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { AppState } from '../../state';

import { loadFontFamilyData, fontFamilyDataLoaded } from '../actions/font-library.actions';
import { getLoadedFonts } from '../selectors/font-library.selectors';

@Injectable({
  providedIn: 'root'
})
export class LoadFontFamilyDataEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private fontManagerService: FontManagerService
  ) {}

  //private family: string = '';

  loadFontFamilyData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFontFamilyData),
      // tap(action => {
      //   const logger = new LoggerService;
      //   logger.enableLogger(true, 'LoadFontFamilyDataEffect');        
      //   logger.log('action', action, undefined, 'LoadFontFamilyDataEffect');

      //   this.family = action.family;
        
      //   // Check if font has been downloaded yet
      //   // this.store$.select(getLoadedFonts).subscribe(fonts => {
      //   //   debugger;
      //   //   if (fonts.includes(action.family)) {
      //   //     this.store$.dispatch(fontFamilyDataLoaded({ family: action.family }));
      //   //     //console.log('!&$!&$$(&$*&@*%&!@%*@*%&!*@&%');            
      //   //   } else {
      //   //     // What to do to get new font data here?
      //   //     this.fontManagerService.loadFont(action.family);
      //   //   }
      //   // })

      // // }),
      //delay(500), // REMOVE THIS!!!!!
      withLatestFrom(
       this.store$.select(getLoadedFonts)
      ),
      map( ([action, fonts]) => { 
        if (fonts.includes(action.family)) {
          debugger;
          return fontFamilyDataLoaded({ family: action.family });
        } //else {
          // const lf = this.fontManagerService.loadFont$(action.family);
          
          // return lf.pipe(
          //   switchMap((family) => {
          //     return fontFamilyDataLoaded({ family: family });
          //   })
          // );
        //}
        return fontFamilyDataLoaded({ family: action.family });
      })

    ),
    //{ dispatch: false }
  );
}