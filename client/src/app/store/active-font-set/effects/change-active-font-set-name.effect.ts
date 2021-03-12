import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, tap } from 'rxjs/operators';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { changeActiveFontSetName, saveActiveFontSet } from '../actions/active-font-set.actions';

@Injectable({
  providedIn: 'root'
})
export class ChangeActiveFontSetNameEffect {
  constructor(
    private actions$: Actions,
  ) {}

  changeActiveFontSetName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeActiveFontSetName),
      tap(action => {
        const logger = new LoggerService;
        logger.enableLogger(true, 'changeActiveFontSetName');        
        logger.log('action', action, undefined, 'changeActiveFontSetName');    
      }),
      map(action => {
        return saveActiveFontSet()
      })     
    ),
    // { dispatch: false }
  );
}