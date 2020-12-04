import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as FontTypeActions from '../actions/font-type.actions';
import { FontTypeApiService } from '../../../services/api/font-type/font-type.api.service';
import { FontTypes } from '../../../models/font-type.model';


@Injectable()
export class LoadFontTypesEffect {

  loadFontTypes$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(FontTypeActions.loadFontTypes),
      switchMap((action) =>
        of(action).pipe(
          withLatestFrom(this.fontTypeApiService.getAllFontTypes$()),
          map(([action, fontTypesApi]) => {            
            debugger;
            const fontTypes = fontTypesApi.map(fontTypeApi => ({ id: fontTypeApi.id, type: fontTypeApi.type as FontTypes }));
            return FontTypeActions.loadFontTypesSuccess({ fontTypes })
          }),
          catchError(error => of(FontTypeActions.loadFontTypesFailure({ error })))
        )
      )).pipe
  });

  constructor(private actions$: Actions, private fontTypeApiService: FontTypeApiService) {}

}
