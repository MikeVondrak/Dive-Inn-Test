import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { of } from "rxjs";
import { concatMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { FontInstanceApi } from "src/app/services/api/font-instance/font-instance.api.model";
import { FontTypes, FontTypeInstanceKvp, FontType } from '../../../models/font-type.model';
import { FontInstanceManagerService } from '../../../services/font-instance-manager/font-instance-manager.service';
import { LoggerService } from '../../../services/logger/logger.service';
import { getActiveFontInstance } from "../../active-font-instance/selectors/active-font-instance.selectors";
import { getUiFontInstances } from '../../app.selectors';
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
            this.store$.select(getActiveFontInstance),
          ),
        )),
        switchMap(([action, activeFontInstance]) => {

          return this.fontInstanceManagerService.addFontInstance$(activeFontInstance).pipe(
            switchMap(addedFontInstance => {
              const added = addedFontInstance as FontInstanceApi;
              return of(activeFontSetFontInstanceLoaded({ fontInstanceApi: added }));
            })
          );

        })

        // check if the font instance has already been loaded / exists, and if not make the API call to load it
        // update the DB with any new font instances and get the IDs back
        // return an ActiveFontSetFontInstanceLoaded action and add case to reducer


        // switchMap(action => of(action).pipe(
        //   withLatestFrom(
        //     this.store$.select(getUiFontInstances),
        //   ),
        // )),
        // switchMap(([action, allFontInstances]) => {

        //   return of(ActiveFontSetFontInstanceLoaded({ fontSet: { set_id: -1, set_name: '', typeInstanceIdMap: undefined } }));
        // })
      ),
      // { dispatch: false }
    );
  }