import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { combineLatest, delay, filter, map, concatMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { FontInstanceApiService } from 'src/app/services/api/font-instance/font-instance.api.service';
import { FontInstanceManagerService } from 'src/app/services/font-instance-manager/font-instance-manager.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { AppState } from '../../state';

import { loadFontInstances, fontInstancesLoaded } from '../actions/font-instance-library.actions';
import { getAllFontInstances } from '../selectors/font-instance-library.selectors';

@Injectable()
export class LoadFontInstancesEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private fontInstanceManagerService: FontInstanceManagerService,
    private fontInstanceApiService: FontInstanceApiService
  ) {}

  loadFontInstances$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFontInstances),
      switchMap((action) => {
        debugger;
        // load font instances list from DB
        return this.fontInstanceApiService.getAllFontInstances$().pipe(
          switchMap((allFontInstances) => of(fontInstancesLoaded({ allFontInstances: allFontInstances})))
        );
      })
    )
  );
    
}    
