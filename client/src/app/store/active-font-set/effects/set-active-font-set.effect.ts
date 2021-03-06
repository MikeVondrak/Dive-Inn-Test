// import { Injectable } from "@angular/core";
// import { Actions, createEffect, ofType } from "@ngrx/effects";
// import { Store } from '@ngrx/store';
// import { of } from "rxjs";
// import { switchMap, tap, withLatestFrom } from 'rxjs/operators';
// import { FontTypes, FontTypeInstanceKvp, FontType } from 'src/app/models/font-type.model';
// import { FontInstanceManagerService } from 'src/app/services/font-instance-manager/font-instance-manager.service';
// import { LoggerService } from 'src/app/services/logger/logger.service';
// import { getUiFontInstances } from '../../app.selectors';
// import { AppState } from '../../state';
// import { activeFontSetLoaded, setActiveFontSet, setActiveFontSetFontInstance } from '../actions/active-font-set.actions';

// @Injectable({
//   providedIn: 'root'
// })
// export class SetActiveFontSetEffect {
//   constructor(
//     private actions$: Actions,
//     private store$: Store<AppState>,
//     private fontInstanceManagerService: FontInstanceManagerService
//   ) { }

//   setActiveFontSet$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(setActiveFontSet),
//       tap(action => {
//         const logger = new LoggerService;
//         logger.enableLogger(true, 'SetActiveFontSetEffect');
//         logger.log('action', action, undefined, 'SetActiveFontSetEffect');
//       }),
//       switchMap(action => of(action).pipe(
//         withLatestFrom(
//           //this.store$.select(getActiveFontSetTypeInstances),
//           this.store$.select(getUiFontInstances),
//         ),
//       )),
//       switchMap(([action, allFontInstances]) => {//, fontInstances]) => {
        
//           // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//           // match type and construct FontType
//           // const fontTypeIdKvp: FontTypeIdKvp = typeInstances.find(ti => ti[0] === key);
//           // const ftiKvpKey: FontType = fontTypeIdKvp.map(ti => {            
//           //   //const ft: FontTypes = key as FontTypes;
//           //   const ft: FontType = {
//           //     id: value,
//           //     type: key as FontTypes
//           //   };
//           //   return ft;
//           // })[0];          
          
//           // const ftiKvp: FontTypeInstanceKvp = {
//           //   key: ftiKvpKey,
//           //   value: fontInstance
//           // }
                  
          
//           // if (fontInstance) {
//           //   // dispatch action to update active font set type instance for type "key"
//           //   this.store$.dispatch(setActiveFontSetFontInstance({ fontTypeInstanceKvp: ftiKvp }));
//           // } else {
//           //   throw new Error('Active Font Set instance ID does not exist: ' + value);
//           // }
//         // });
//         return of(activeFontSetLoaded({ fontSet: { set_id: -1, set_name: '', typeInstanceIdMap: undefined } }));
//       })
//     ),
//   );
// }