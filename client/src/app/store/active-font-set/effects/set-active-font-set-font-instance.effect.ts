import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { of } from "rxjs";
import { concatMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { FontInstanceApi } from "src/app/services/api/font-instance/font-instance.api.model";
import { FontTypes, FontTypeInstanceKvp, FontType, FontTypeInstanceIdPair } from '../../../models/font-type.model';
import { FontInstanceManagerService } from '../../../services/font-instance-manager/font-instance-manager.service';
import { LoggerService } from '../../../services/logger/logger.service';
import { getActiveFontInstance, getActiveFontInstanceApi } from "../../active-font-instance/selectors/active-font-instance.selectors";
import { getUiFontInstances } from '../../app.selectors';
import { getFontInstances } from "../../font-instance-library/selectors/font-instance-library.selectors";
import { loadFontFamilyData } from '../../font-library/actions/font-library.actions';
import { AppState } from '../../state';
import { activeFontSetFontInstanceLoaded, setActiveFontSetFontInstance } from "../actions/active-font-set.actions";
import { getActiveFontSetTypeInstanceIds } from '../selectors/active-font-set.selectors';

@Injectable({
    providedIn: 'root'
  })
  export class SetActiveFontSetFontInstanceEffect {
    constructor(
      private actions$: Actions,
      private store$: Store<AppState>,
      private fontInstanceManagerService: FontInstanceManagerService
    ) { }
  
    setActiveFontSetFontInstance$ = createEffect(() =>
      this.actions$.pipe(
        ofType(setActiveFontSetFontInstance),
        tap(action => {
          const logger = new LoggerService;
          logger.enableLogger(true, 'SetActiveFontSetFontInstanceEffect');
          logger.log('action', action, undefined, 'SetActiveFontSetFontInstanceEffect');
        }),
        switchMap(action => of(action).pipe(
          withLatestFrom(
            this.store$.select(getActiveFontInstanceApi),
            this.store$.select(getFontInstances)
          ),
        )),
        switchMap(([action, activeFontInstance, fontInstances]) => {
          const type = action.fontType;
          const existingInstance = fontInstances.find(fi => 
            fi.family === activeFontInstance.family && 
            fi.fk_font_weight_id === activeFontInstance.fk_font_weight_id &&
            fi.italic === activeFontInstance.italic &&
            fi.size === activeFontInstance.size
          );
          if (!!existingInstance) {
            return of(activeFontSetFontInstanceLoaded({ fontTypeId: type.id, fontInstanceApi: existingInstance }));
          }
          return this.fontInstanceManagerService.addFontInstance$(activeFontInstance).pipe(
            switchMap(addedFontInstance => {
              const added = addedFontInstance[0] as FontInstanceApi;
              return of(activeFontSetFontInstanceLoaded({ fontTypeId: type.id, fontInstanceApi: added }));
            })
          );

        })
      ),
      // { dispatch: false }
    );
  }