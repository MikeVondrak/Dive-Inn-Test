import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { combineLatest, forkJoin, of, zip } from 'rxjs';
import { delay, filter, map, concatMap, switchMap, tap, withLatestFrom, mergeMap } from 'rxjs/operators';


import { AppState } from '../../state';

//import { FontSetApiService } from 'src/app/services/api/font-set/font-set.api.service';
import { FontSetApiService } from '../../../services/api/font-set/font-set.api.service';

// import { LoggerService } from 'src/app/services/logger/logger.service';

import { loadFontSets, fontSetsLoaded, updateFontSet, updateFontSetSuccess, fontSetsError } from '../actions/font-set.actions';



@Injectable()
export class UpdateFontSetEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private fontSetApiService: FontSetApiService
  ) {}

  updateFontSet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateFontSet),
      mergeMap(action => {
        return combineLatest(
          of(action),
          this.fontSetApiService.updateFontSet$(action.updatedFontSetApi)
        );
      }),
      map(([action, success]) => {
        if(success) {
          debugger;
          return updateFontSetSuccess({ updatedFontSetApi: action.updatedFontSetApi});
        } else {
          return fontSetsError();
        }
      })
    )
  );
    
}    
