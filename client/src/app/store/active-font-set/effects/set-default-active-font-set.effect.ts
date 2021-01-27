import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { combineLatest, of } from "rxjs";
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { defaultFontInstance } from 'src/app/models/font-instance.model';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { setActiveFontInstance } from '../../active-font-instance/actions/active-font-instance.actions';
import { loadFontFamilyData } from '../../font-library/actions/font-library.actions';
import { getAllFontTypes, getFontTypesLoaded } from "../../font-type/selectors/font-type.selectors";
import { AppState } from "../../state";
import { setActiveFontSetFontInstance, setDefaultActiveFontSet } from '../actions/active-font-set.actions';

@Injectable({
  providedIn: 'root'
})
export class SetDefaultActiveFontSetEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
  ) {}

  setDefaultActiveFontSet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setDefaultActiveFontSet),
      tap(action => {
        const logger = new LoggerService;
        logger.enableLogger(true, 'SetDefaultActiveFontSetEffect');        
        logger.log('action', action, undefined, 'SetDefaultActiveFontSetEffect');    
      }),
      switchMap(action => this.store$.select(getFontTypesLoaded).pipe(filter(loaded => loaded))),
      switchMap(loaded => this.store$.select(getAllFontTypes)),
      tap((types) => {
        types.forEach(type => {
          // TODO: this doesn't work to generate blank type-instance boxes for the default font set because an active font set is not initally loaded on app init
          // move this to the NEW SET button logic to create type-instance boxes populated with a default font when a new font set is being created
          this.store$.dispatch(setActiveFontSetFontInstance({fontType: type}))
        });
      })      
    ),
    { dispatch: false }
  );
}