import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { groupBy, map, switchMap, take } from 'rxjs/operators';
import { FontSet } from 'src/app/models/font-set.model';
import { FontSetApi } from '../../../services/api/font-set/font-set.api.model';
import { routes } from '../../../../../../server/src/app/routes';
import { FontSetManagerService } from '../../font-set-manager/font-set-manager.service';

@Injectable({
  providedIn: 'root'
})
export class FontSetApiService {

  private baseRoute: string = routes.api._root + routes.api.font._root + routes.api.font.fontSet._root;

  constructor(
    private http: HttpClient,
    private fontSetManagerService: FontSetManagerService
  ) { }

  /**
   * get the raw data from the DB w/o packaging set rows into a single object
   */
  public getFontSetApis$(): Observable<FontSetApi[]> {
    const fontSetApis: Observable<FontSetApi[]>
      = this.http.get<FontSetApi[]>(this.baseRoute);
    
    return fontSetApis;
  }

  //public getMappedFontSetApis$(): Observable<FontSetApi[]>

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
  // }

  // public updateFontSet$(): Observable<FontSet> {
  //   const route = this.baseRoute + routes.api.font.fontSet.add;
  //   const headers = { 'content-type': 'application/json' };
    
    
  //   // need to get the active font set
  //   return this.fontSetManagerService.allFontSets$.pipe(
  //     switchMap(allFontSets => {
  //       return this.http.post<FontSet>(
  //         route, 
  //         allFontSets,
  //         { 'headers': headers }
  //       );
  //     }));
  // }

  // public addFontSet$(newFontSetName: string): Observable<FontSet> {
  //   const payload = this.fontSetToFontSetApiArray(newFontSet);
  // }

  private fontSetToFontSetApiArray(fontSet: FontSet): FontSetApi[] {
    // break FontSet up into an array of FontSetApi for table rows

    // getActiveFontSetId
    // getActiveFontSetName
    // getActiveFontSetLastUpdated
    // getActiveFontSetTypeInstances
    // getActiveFontSetFontInstances

    // id: number;
    // set_id: number;
    // set_name: string;
    // fk_font_type_id: number;
    // fk_font_instance_id: number;
    // type: string;

    return [];
  }

}
