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
import { UuidService } from 'src/app/services/uuid/uuid.service';
import { FontSetManagerService } from "src/app/services/font-set-manager/font-set-manager.service";

@Injectable({
  providedIn: 'root'
})
export class CreateNewFontSetEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private uuidService: UuidService,
    private fontSetManagerService: FontSetManagerService,
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
        const newSetId = this.uuidService.getUuid();
        // update the db (or update after the save button is clicked?)
        this.fontSetManagerService.createFontSet$(setName, newSetId)
        
        // update the font set name and id
        
        // if activeFontSetLoaded is false
        //    setDefaultActiveFontSet
        // return nothing?
        // else
        return changeActiveFontSetName({ setName: setName })
      })      
    ),
    // { dispatch: false }
  );
}