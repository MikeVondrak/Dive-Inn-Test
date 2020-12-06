// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, map, concatMap, withLatestFrom, switchMap, take } from 'rxjs/operators';
// import { EMPTY, of } from 'rxjs';

// import * as FontTypeActions from '../actions/font-type.actions';
// import { FontTypeApiService } from '../../../../app/services/api/font-type/font-type.api.service';
// import { FontTypes } from '../../../../app/models/font-type.model';
// import { FontTypeApi } from '../../../services/api/font-type/font-type.api.model';



// @Injectable()
// export class FontTypeEffects {

//   loadFontTypes$ = createEffect(() => {
//     return this.actions$.pipe( 
//       ofType(FontTypeActions.loadFontTypes),

//       switchMap((action) => {
//         return this.fontTypeApiService.getAllFontTypes$().pipe(
//           take(1),
//           map((fontTypesApi: FontTypeApi[]) => {
//             const fontTypes = fontTypesApi.map(fontTypeApi => ({ id: fontTypeApi.id, type: fontTypeApi.type as FontTypes }));
//             return FontTypeActions.loadFontTypesSuccess({ fontTypes })
//           }),
//           catchError(error => of(FontTypeActions.loadFontTypesFailure({ error })))
//         )
//       })
//     );
//   });

//   constructor(private actions$: Actions, private fontTypeApiService: FontTypeApiService) {}

// }
