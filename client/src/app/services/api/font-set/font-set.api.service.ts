import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { groupBy, map, switchMap, take } from 'rxjs/operators';
import { FontSet } from 'src/app/models/font-set.model';
import { FontSetApi, FontSetApiMapped } from '../../../services/api/font-set/font-set.api.model';
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

  public updateFontSet$(fontSet: FontSetApiMapped): Observable<boolean> {
    const route = this.baseRoute + routes.api.font.fontSet.update;
    const headers = { 'content-type': 'application/json' }; 
    
    // need to break down the FontSetApiMapped into an array of FontSetApi, without the id field
    const fontSetApis: FontSetApi[] = this.fontSetApiMappedToFontSetApiArray(fontSet);
    debugger;
    return this.http.post<FontSetApi[]>(
      route, 
      fontSetApis,
      { 'headers': headers }
    ).pipe(
      map(response => !!response)
    );
    
  }

  // public addFontSet$(newFontSetName: string): Observable<FontSet> {
  //   const payload = this.fontSetToFontSetApiArray(newFontSet);
  // }

  private fontSetApiMappedToFontSetApiArray(fontSet: FontSetApiMapped): FontSetApi[] {
    let fontSetApis: FontSetApi[] = [];
    let fontSetApi: FontSetApi;
    
    // break FontSet up into an array of FontSetApi for table rows
    fontSet.typeInstanceIdMap.map(ti => {
      fontSetApi = {
        set_id: fontSet.set_id,
        set_name: fontSet.set_name,
        fk_font_type_id: ti.typeId,
        fk_font_instance_id: ti.instanceId,
      }
      fontSetApis.push(fontSetApi);
    });
    return fontSetApis;
  }

}
