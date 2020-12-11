// import { Injectable } from "@angular/core";
// import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
// import { Store } from '@ngrx/store';
// import { of } from 'rxjs';
// import { combineLatest, delay, filter, map, concatMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
// import { FontInstanceManagerService } from 'src/app/services/font-instance-manager/font-instance-manager.service';
// import { LoggerService } from 'src/app/services/logger/logger.service';
// import { AppState } from '../../state';

// import { loadFontInstanceById, fontInstanceLoaded } from '../actions/font-instance-library.actions';
// import { getAllFontInstances } from '../../app.selectors';

// @Injectable()
// export class LoadFontInstanceByIdEffect {
//   constructor(
//     private actions$: Actions,
//     private store$: Store<AppState>,
//     private fontInstanceManagerService: FontInstanceManagerService
//   ) {}

//   loadFontInstanceById$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(loadFontInstanceById),
//       concatMap(action => of(action).pipe(
//         withLatestFrom(
//           this.store$.select(getAllFontInstances)
//         )
//       )),
//       switchMap(([action, loadedFontInstances]) => {
//         // check to see if font has already been loaded
//         const fi = loadedFontInstances.find(fi => fi.id === action.fontInstanceId);
//         if (fi) {
//           return of(fontInstanceLoaded({ fontInstance: fi }));
//         }
//         // hasn't been loaded so get from DB
//         return this.fontInstanceManagerService.getFontInstanceById$(action.fontInstanceId).pipe(
//           switchMap((instance) => of(fontInstanceLoaded({ fontInstance: instance })))
//         );
     
//       })
//     )
//   );
    
// }    
