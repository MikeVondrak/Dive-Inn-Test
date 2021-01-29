import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { of } from "rxjs";
import { concatMap, exhaustMap, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { FontTypes, FontTypeInstanceKvp, FontType } from 'src/app/models/font-type.model';
import { FontSetApiMapped } from "src/app/services/api/font-set/font-set.api.model";
import { FontInstanceManagerService } from 'src/app/services/font-instance-manager/font-instance-manager.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { getUiFontInstances } from '../../app.selectors';
import { AppState } from '../../state';
import { saveActiveFontSet, setActiveFontSetSavedFlag } from "../actions/active-font-set.actions";
import { getActiveFontSet, getActiveFontSetTypeInstanceIds } from "../selectors/active-font-set.selectors";

@Injectable({
  providedIn: 'root'
})
export class SaveActiveFontSetEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private fontInstanceManagerService: FontInstanceManagerService
  ) { }

  saveActiveFontSet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveActiveFontSet),
      tap(action => {
        debugger;
        const logger = new LoggerService;
        logger.enableLogger(true, 'SaveActiveFontSetEffect');
        logger.log('action', action, undefined, 'SaveActiveFontSetEffect');
      }),
      concatMap(action => this.store$.select(getActiveFontSet)),
      exhaustMap((action, activeFontSet) => {  
        
        debugger;
        // turn it into an object that matches the table w/rows for each type
        // POST from API
        // success => return saved / fail => ??
        // update the FontSetLibrary via entity
        //
        
        return of(setActiveFontSetSavedFlag({savedFlag: true}));
      })
      
    ),
    // { dispatch: false }
  );
}