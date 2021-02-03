import { Injectable } from '@angular/core';
// import { FontSetApiService } from '../api/font-set/font-set.api.service';
// import { FontInstanceApiService } from '../api/font-instance/font-instance.api.service';
import { FontInstance } from 'src/app/models/font-instance.model';
import { Observable } from 'rxjs';
import { FontSet } from 'src/app/models/font-set.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
//import { ActiveFontSetState } from 'src/app/store/active-font-set/active-font-set.state';
import { loadFontSets, createFontSet, updateFontSet } from 'src/app/store/font-set-library/actions/font-set.actions';
import { getFontSetsListView } from 'src/app/store/font-set-library/selectors/font-set-library.selectors';
//import { getActiveFontSet } from 'src/app/store/active-font-set/selectors/active-font-set.selectors';
import { FontSetState } from 'src/app/store/font-set-library/entity/font-set.entity';
import { FontSetApi, FontSetApiMapped } from '../api/font-set/font-set.api.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FontSetManagerService {

  //private fontSetApis$: Observable<FontSetApi[]> = this.store$.select(getFontSets);

  //public allFontSets$: Observable<FontSet[]> = this.store$.select(getUiFontSets);
   public fontSetsListView$ = this.store$.select(getFontSetsListView);

  constructor(
    // TODO: how to use a slice of the store instead of entire AppState?
    private store$: Store<AppState>,
  ) { }

  public loadFontSets$(): void {
    this.store$.dispatch(loadFontSets());
  }

  public updateFontSet$(updatedFontSetApi: FontSetApiMapped): void {
    debugger;
    this.store$.dispatch(updateFontSet({ updatedFontSetApi: updatedFontSetApi }));
  }

  public createFontSet$(newFontSetName: string): void {
    this.store$.dispatch(createFontSet({ newFontSetName: newFontSetName }));
  }



  // private getUiFontSets$() {
  //   const uiFontSets = this.fontSetApis$.pipe(
  //     map((fontSetApis: FontSetApi[]) => {
  //       // convert the multiple entries (rows) for a font set to a ui object with a type-name -> font-instance map

  //       const uiFontSets: Observable<FontSet[]> = fontSetApis
  //         .reduce((accum, item) => {
  //           let newSet = true;
  //           accum.forEach(fontSet => {
  //             if (item.set_id === fontSet.setId) {
  //               fontSet.typeIdInstanceIdMap
  //             }
  //           })

  //           return accum;
  //         },
  //         new Array<FontSet>()
  //       );
        
  //     }));
  //   }
    
  // }
}
  
  // public getAllFontSets$(): Observable<FontSet[]> {
//   const allFontSets: Observable<FontSet[]>
//     = this.http.get<FontSetApi[]>(this.baseRoute).pipe(        
//       map(fontSetApiArray => {
//         const groupedSet = fontSetApiArray.reduce(
//           (accum, item) => {
//             let newSet = true;
//             accum.forEach(fontSet => {
//               if (item.set_id === fontSet.setId) {
//                 fontSet.typeInstanceMap.set(item.type, item.fk_font_instance_id);
//                 newSet = false;
//               }
//             });
//             if (newSet) {
//               const newFontSet: FontSet = {
//                 id: item.id,
//                 setId: item.set_id,
//                 name: item.set_name,
//                 lastUpdated: new Date,
//                 typeInstanceMap: new Map<string, number>()
//               }
//               newFontSet.typeInstanceMap.set(item.type, item.fk_font_instance_id);
//               accum.push(newFontSet);
//             }
//             return accum;
//           },
//           new Array<FontSet>()
//         );          
//         return groupedSet;
//       })
//     );

//     return allFontSets;