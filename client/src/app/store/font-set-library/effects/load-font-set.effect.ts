import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { combineLatest, delay, filter, map, concatMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../../state';

//import { FontSetApiService } from 'src/app/services/api/font-set/font-set.api.service';
import { FontSetApiService } from '../../../services/api/font-set/font-set.api.service';

// import { LoggerService } from 'src/app/services/logger/logger.service';

import { loadFontSets, fontSetsLoaded } from '../actions/font-set-library.actions';


@Injectable()
export class LoadFontSetDataEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private fontSetApiService: FontSetApiService
  ) {}

  loadFontSets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFontSets),
      switchMap((action) => {
        return this.fontSetApiService.getAllFontSets$().pipe(
          switchMap(() => {
            return of(fontSetsLoaded());
          })
        );
      })
    )
  );
    
}    
