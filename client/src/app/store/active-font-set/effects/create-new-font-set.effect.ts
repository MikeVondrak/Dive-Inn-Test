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
import { changeActiveFontSetName, createNewFontSet } from '../actions/active-font-set.actions';
import { getActiveFontSetLoaded, getNewFontSetName } from "../selectors/active-font-set.selectors";

@Injectable({
  providedIn: 'root'
})
export class CreateNewFontSetEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
  ) {}

  createNewFontSet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createNewFontSet),
      tap(action => {
        const logger = new LoggerService;
        logger.enableLogger(true, 'createNewFontSet');        
        logger.log('action', action, undefined, 'createNewFontSet');    
      }),
      withLatestFrom(
        this.store$.select(getNewFontSetName),
        this.store$.select(getActiveFontSetLoaded)
      ),
      map(([action, setName, activeFontSetLoaded]) => {
        debugger;
        
        // update the font set name and id
        // update the db (or update after the save button is clicked?)
        // if activeFontSetLoaded is false
        //    setDefaultActiveFontSet
        // return nothing?

        return changeActiveFontSetName({ setName: setName })
      })      
    ),
    // { dispatch: false }
  );
}