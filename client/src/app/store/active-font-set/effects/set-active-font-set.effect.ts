import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { of } from "rxjs";
import { concatMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { FontTypeInstanceKvp } from 'src/app/models/font-type.model';
import { FontInstanceManagerService } from 'src/app/services/font-instance-manager/font-instance-manager.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { getLoadedFontInstances } from '../../font-instance-library/selectors/font-instance-library.selectors';
import { loadFontFamilyData } from '../../font-library/actions/font-library.actions';
import { AppState } from '../../state';
import { fontSetLoaded, setActiveFontSet, setActiveFontSetFontInstance } from '../actions/active-font-set.actions';
import { getActiveFontSetFontInstances, getActiveFontSetTypeInstances } from '../selectors/active-font-set.selectors';

@Injectable({
  providedIn: 'root'
})
export class SetActiveFontSetEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private fontInstanceManagerService: FontInstanceManagerService
  ) { }

  setActiveFontSet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setActiveFontSet),
      tap(action => {
        const logger = new LoggerService;
        logger.enableLogger(true, 'SetActiveFontSetEffect');
        logger.log('action', action, undefined, 'SetActiveFontSetEffect');
      }),
      switchMap(action => of(action).pipe(
        withLatestFrom(
          this.store$.select(getActiveFontSetTypeInstances),
          this.store$.select(getLoadedFontInstances),
        ),
      )),
      switchMap(([action, typeInstances, fontInstances]) => {
        // Load all the font instances on app load - DONE
        // When a new instance is added update the DB and refresh the FE list
        // When a new active font set is selected,
        //  loop through the font set type-instance map and grab the FontInstance object from the ID
        //    get from the FE list because it should be up to date, don't need to call DB here

        // loop through type->instanceId map of new active font set and check if instance has been loaded
        // e.g. on app load the FE 
        
        action.fontSet.typeInstanceMap.forEach((value: number, key: string) => {
          // check to see if instances in the font set have already been loaded
          const fontInstance = fontInstances.find(fi => fi.id === value);
          const ftiKvp: FontTypeInstanceKvp = {
            key: key,
            value: fontInstance
          }
          if (fontInstance) {
            // dispatch action to update active font set type instance for type "key"
            this.store$.dispatch(setActiveFontSetFontInstance({ fontTypeInstanceKvp: ftiKvp }));
          } else {
            throw new Error('Active Font Set instance ID does not exist: ' + value);
          }
        });
        return of(fontSetLoaded());
      })
    ),
    //{ dispatch: false }
  );
}