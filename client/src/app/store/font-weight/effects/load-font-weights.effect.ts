import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, take } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as FontWeightActions from '../actions/font-weight.actions';
import { FontWeightApiService } from 'src/app/services/api/font-weight/font-weight.api.service';
import { FontWeightApi } from 'src/app/services/api/font-weight/font-weight.api.model';



@Injectable()
export class LoadFontWeightsEffect {

  loadFontWeights$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(FontWeightActions.loadFontWeights),
      switchMap((action) => {
        return this.fontWeightApiService.getFontWeights$().pipe(
          take(1),
          map((fontWeights: FontWeightApi[]) => {            
            return FontWeightActions.loadFontWeightsSuccess({ fontWeights })
          }),
          catchError(error => of(FontWeightActions.loadFontWeightsFailure({ error })))
        )
      })
    );
  });

  constructor(private actions$: Actions, private fontWeightApiService: FontWeightApiService) {}

}
