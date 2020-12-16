import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { defaultFontInstance } from '../../../models/font-instance.model';
import { LoggerService } from '../../../services/logger/logger.service';
import { setActiveFontInstance } from '../../active-font-instance/actions/active-font-instance.actions';
import { activeFontSetLoaded, setActiveFontSetById } from '../actions/active-font-set.actions';
import { AppState } from '../../state';
import { getFontSetById } from '../../font-set-library/selectors/font-set-library.selectors';

@Injectable({
  providedIn: 'root'
})
export class SetActiveFontSetByIdEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>
  ) {}

  setActiveFontSetById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setActiveFontSetById),
      tap(action => {
        debugger;
        const logger = new LoggerService;
        logger.enableLogger(true, 'SetActiveFontSetByIdEffect');        
        logger.log('action', 'id: ' + action.fontSetId, undefined, 'SetActiveFontSetByIdEffect');    
      }),
      switchMap((action) => {
        // get FontSet data from store and find the set matching the action's setId
        return this.store$.select(getFontSetById, { setId: action.fontSetId }).pipe(
          take(1),
          switchMap(fontSet => {
            return of(activeFontSetLoaded({ fontSet: fontSet }))
          })
        );
       // return of(action)
      }),
    ),
    //{ dispatch: false }
  );
}