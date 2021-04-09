import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { combineLatest, of } from "rxjs";
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { defaultFontInstance } from 'src/app/models/font-instance.model';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { setActiveFontInstance } from '../../active-font-instance/actions/active-font-instance.actions';
import { getAllFontTypes, getFontTypesLoaded } from "../../font-type/selectors/font-type.selectors";
import { AppState } from "../../state";
import { activeFontSetLoaded, changeActiveFontSetName, createNewFontSet, setActiveFontSetById } from '../actions/active-font-set.actions';
import { getActiveFontSetLoaded, getNewFontSetName } from "../selectors/active-font-set.selectors";
import { UuidService } from 'src/app/services/uuid/uuid.service';
import { FontSetManagerService } from "src/app/services/font-set-manager/font-set-manager.service";
import { FontSetApiMapped } from "src/app/services/api/font-set/font-set.api.model";
import { FontTypeInstanceIdPair, FontTypeInstancePair } from "src/app/models/font-type.model";
import { addFontSetToLibrary } from "../../font-set-library/actions/font-set.actions";

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
        this.store$.select(getActiveFontSetLoaded),
        this.store$.select(getAllFontTypes)
      ),
      switchMap(([action, setName, isActiveFontSetLoaded, fontTypes]) => {
        const newSetId = this.uuidService.getUuid();

        // NOTE: if we want to preserve the current font-instance selections we could pull in the active font set
        // here and populate the new font set with the active font set type-instance values

        // construct a new FontSetApiMapped to send to DB
        const typeInstanceIdMap: FontTypeInstanceIdPair[] = fontTypes.map(fontType => {
          // NOTE: hardcoded to the first font-instance for lazy
          return { typeId: fontType.id, instanceId: 1 }
        });
        const newFontSet: FontSetApiMapped = {
          set_id: newSetId,
          set_name: setName,
          typeInstanceIdMap: typeInstanceIdMap
        }

        // update the db (or update after the save button is clicked?)
        return this.fontSetManagerService.createFontSet$(newFontSet).pipe(
          // original way
          // map((response: FontSetApiMapped) => {
            // this.store$.dispatch(addFontSetToLibrary({ fontSetApi: response }));
            // return activeFontSetLoaded({ fontSet: response });

          // TODO: why does switchMap work here??
          switchMap((response: FontSetApiMapped) => {            
            return([addFontSetToLibrary({ fontSetApi: response }), activeFontSetLoaded({ fontSet: response })]);
          })
        )        
      })      
    ),
    // { dispatch: false }
  );
}