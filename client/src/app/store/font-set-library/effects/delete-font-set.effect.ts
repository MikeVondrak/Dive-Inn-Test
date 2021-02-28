import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { combineLatest, forkJoin, of, zip } from 'rxjs';
import { delay, filter, map, concatMap, switchMap, tap, withLatestFrom, mergeMap, take } from 'rxjs/operators';


import { AppState } from '../../state';

//import { FontSetApiService } from 'src/app/services/api/font-set/font-set.api.service';
import { FontSetApiService } from '../../../services/api/font-set/font-set.api.service';

// import { LoggerService } from 'src/app/services/logger/logger.service';

import { loadFontSets, fontSetsLoaded, updateFontSet, updateFontSetSuccess, fontSetsError, deleteFontSet, deleteFontSetSuccess } from '../actions/font-set.actions';
import { getFontSetApisById } from "../selectors/font-set-library.selectors";



@Injectable()
export class DeleteFontSetEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private fontSetApiService: FontSetApiService
  ) {}

  deleteFontSet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteFontSet),
      mergeMap(action => {
        let id = action.fontSetId;
        return combineLatest([
          of(action),
          this.fontSetApiService.deleteFontSet$(action.fontSetId),
          this.store$.select(getFontSetApisById, { fontSetId: id }).pipe(take(1))
        ])
      }),
      map(([action, success, fontSetApis]) => {
        const idsToDelete = fontSetApis.map(fsApi => fsApi.id);
        if(success) {
          return deleteFontSetSuccess({ fontSetRowIds: idsToDelete });
        } else {
          return fontSetsError();
        }
      })
    )
  );
    
}    
