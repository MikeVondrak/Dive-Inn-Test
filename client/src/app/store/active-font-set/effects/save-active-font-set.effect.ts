import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { of } from "rxjs";
import { concatMap, exhaustMap, map, mergeMap, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { FontTypes, FontTypeInstanceKvp, FontType } from 'src/app/models/font-type.model';
import { FontSetApiMapped } from "src/app/services/api/font-set/font-set.api.model";
import { FontInstanceManagerService } from 'src/app/services/font-instance-manager/font-instance-manager.service';
import { FontSetManagerService } from "src/app/services/font-set-manager/font-set-manager.service";
import { LoggerService } from 'src/app/services/logger/logger.service';
import { getUiFontInstances } from '../../app.selectors';
import { AppState } from '../../state';
import { activeFontSetError, saveActiveFontSet, setActiveFontSetSavedFlag } from "../actions/active-font-set.actions";
import { getActiveFontSet, getActiveFontSetTypeInstanceIds } from "../selectors/active-font-set.selectors";

@Injectable({
  providedIn: 'root'
})
export class SaveActiveFontSetEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private fontSetManagerService: FontSetManagerService
  ) { }

  saveActiveFontSet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveActiveFontSet),
      tap(action => {
        const logger = new LoggerService;
        logger.enableLogger(true, 'SaveActiveFontSetEffect');
        logger.log('action', action, undefined, 'SaveActiveFontSetEffect');
      }),
      switchMap(action => this.store$.select(getActiveFontSet).pipe(take(1))),
      tap((activeFontSet) => {
        console.log("saveActiveFontSet effect\n" + JSON.stringify(activeFontSet) + "\n\n");        
        this.fontSetManagerService.updateFontSet$(activeFontSet);
      })
    ),
    { dispatch: false }
  );
}