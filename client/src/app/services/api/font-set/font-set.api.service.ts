import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { groupBy, map, switchMap, take } from 'rxjs/operators';
import { FontSet } from 'src/app/models/font-set.model';
import { FontSetApi, FontSetApiMapped, fontSetApiMappedToFontSetApiArray } from '../../../services/api/font-set/font-set.api.model';
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

  public createFontSet$(fontSetName: string, fontSetId: string) {
    const route = this.baseRoute + routes.api.font.fontSet.add;
    const headers = { 'content-type': 'application/json' }; 

    return this.http.post<{ fontSetName, fontSetId }>(
      route,
      { fontSetName, fontSetId },
      { 'headers': headers }
    ).pipe(

      // on the server side we use RETURNING to make the response be the newly created font set
      // should return a FontSet type from here, figure out how to map it
      // how do you return a different type than the type specified for the post<>???

      map(response => response as FontSet)
    );
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

}
