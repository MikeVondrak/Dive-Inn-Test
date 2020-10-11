// import { Injectable } from "@angular/core";
// import { Actions, createEffect, ofType } from "@ngrx/effects";
// import { tap } from 'rxjs/operators';

// import { setActiveFontInstance } from '../actions/active-font-instance.actions';

// @Injectable()
// export class SetActiveFontInstanceEffect {
//   constructor(
//     private actions$: Actions,
    
//   ) {}

//   setActiveFontInstance$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(setActiveFontInstance),
//       tap(action => {
//         console.log('------- SetActiveFontInstance Effect: ' + JSON.stringify(action, null, 4));

//         // change tap to map and remove dispatch false
//         //  - what action to return?

//         // dispatch getFontFamily
//         // wait for fontFamilyReturned
//         // dispatch fontFamilyReady
        



//         // -- in other files
//         // check if need to download font
//         // download font
//         // show loading state
//         // loading complete / error handling 
//         // update font style
    
//       })
//     ),
//     { dispatch: false }
//   );
// }