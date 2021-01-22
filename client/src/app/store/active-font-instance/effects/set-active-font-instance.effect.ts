import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { FontWeight } from "src/app/models/font-weight.model";
import { FontInstanceApi } from "src/app/services/api/font-instance/font-instance.api.model";
import { LoggerService } from 'src/app/services/logger/logger.service';
import { loadFontFamilyData } from '../../font-library/actions/font-library.actions';
import { getFontWeights } from "../../font-weight/selectors/font-weight.selectors";
import { AppState } from "../../state";
import { setActiveFontInstance, setActiveFontInstanceApi } from '../actions/active-font-instance.actions';

@Injectable({
  providedIn: 'root'
})
export class SetActiveFontInstanceEffect {
  constructor(
    private actions$: Actions,    
    private store$: Store<AppState>,
  ) {}

  // logic moved to FontLibrary
  setActiveFontInstance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setActiveFontInstance),
      tap(action => {
        const logger = new LoggerService;
        logger.enableLogger(true, 'SetActiveFontInstanceEffect');        
        logger.log('action', action, undefined, 'SetActiveFontInstanceEffect');
      }),
      withLatestFrom(this.store$.select(getFontWeights)),
      switchMap(([action, weights]) => {
        const fi = action.fontInstance;
        let w = weights.find(weight => weight.weight === fi.weight);
        const weightId = w ? w.id : -1;
        const fontInstanceApi: FontInstanceApi = {
          family: fi.family,
          italic: fi.italic,
          size: fi.size,
          id: fi.id, // TODO: do we want to write the ID here? will we be writing -1?
          fk_font_weight_id: weightId,
        };
        return of(setActiveFontInstanceApi({ fontInstanceApi }));
      })
    ),
    //{ dispatch: false } 
  );
}