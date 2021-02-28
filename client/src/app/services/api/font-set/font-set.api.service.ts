import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { groupBy, map, switchMap, take } from 'rxjs/operators';
import { FontSet } from 'src/app/models/font-set.model';
import { FontSetApi, FontSetApiMapped, fontSetApiMappedToFontSetApiArray } from '../../../services/api/font-set/font-set.api.model';
import { routes } from '../../../../../../server/src/app/routes';
import { FontTypeInstanceIdPair } from 'src/app/models/font-type.model';

@Injectable({
  providedIn: 'root'
})
export class FontSetApiService {

  private baseRoute: string = routes.api._root + routes.api.font._root + routes.api.font.fontSet._root;

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * get the raw data from the DB w/o packaging set rows into a single object
   */
  public getFontSetApis$(): Observable<FontSetApi[]> {
    const fontSetApis: Observable<FontSetApi[]>
      = this.http.get<FontSetApi[]>(this.baseRoute);
    
    return fontSetApis;
  }

  public createFontSet$(newFontSet: FontSetApiMapped): Observable<FontSetApiMapped> {
    const route = this.baseRoute + routes.api.font.fontSet.add;
    const headers = { 'content-type': 'application/json' };
    const body = fontSetApiMappedToFontSetApiArray(newFontSet);
    
    const postResponse = this.http.post<FontSetApi[]>(
      route,
      body,
      { 'headers': headers }
    ).pipe(
      map((response: FontSetApi[]) => {
        // convert array of FontSetApi to a FontSetApiMapped object
        let fsApiMappedResult: FontSetApiMapped = {
          set_id: response[0].set_id,
          set_name: response[0].set_name,
          typeInstanceIdMap: []
        };
        fsApiMappedResult.typeInstanceIdMap = response.map(fsApi => {
          const ti: FontTypeInstanceIdPair = {
            typeId: fsApi.fk_font_type_id,
            instanceId: fsApi.fk_font_instance_id,
            entityId: fsApi.id
          }
          return ti;
        });
        return fsApiMappedResult;
      }));
    return postResponse;
  }

  public updateFontSet$(fontSet: FontSetApiMapped): Observable<boolean> {
    const route = this.baseRoute + routes.api.font.fontSet.update;
    const headers = { 'content-type': 'application/json' }; 
    
    // need to break down the FontSetApiMapped into an array of FontSetApi, without the id field
    const fontSetApis: FontSetApi[] = fontSetApiMappedToFontSetApiArray(fontSet);
    return this.http.post<FontSetApi[]>(
      route, 
      fontSetApis,
      { 'headers': headers }
    ).pipe(
      map(response => !!response)
    ); 
  }

  public deleteFontSet$(fontSetId: string): Observable<boolean> {
    const route = this.baseRoute + routes.api.font.fontSet.remove;
    const headers = { 'content-type': 'application/json' }; 
    const body = { fontSetId };

    return this.http.post<{ fontSetId }>(
      route,
      body,
      { 'headers': headers }
    ).pipe(
      map(response => !!response)
    );

    return of(false);
  }

}
