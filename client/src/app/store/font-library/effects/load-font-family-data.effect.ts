import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { combineLatest, delay, filter, map, concatMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { FontManagerService } from 'src/app/services/font-manager.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { AppState } from '../../state';

import { loadFontFamilyData, fontFamilyDataLoaded } from '../actions/font-library.actions';
import { getLoadedFonts } from '../selectors/font-library.selectors';

@Injectable()
export class LoadFontFamilyDataEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private fontManagerService: FontManagerService
  ) {}

  loadFontFamilyData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFontFamilyData),
      concatMap(action => of(action).pipe(
        withLatestFrom(
          this.store$.select(getLoadedFonts)
        )
      )),
      switchMap(([action, loadedFonts]) => {
        // check to see if font has already been loaded
        if (loadedFonts.includes(action.family)) {
          return of(fontFamilyDataLoaded({ family: action.family }));
        }
        return this.fontManagerService.loadFont$(action.family).pipe(
          switchMap((family) => of(fontFamilyDataLoaded({ family: family })))
        );
     
      })
    )
  );
    
}    
