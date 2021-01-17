import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FontInstance } from 'src/app/models/font-instance.model';
import { routes } from '../../../../../../server/src/app/routes';
import { LoggerService } from '../../logger/logger.service';
import { FontInstanceApi } from './font-instance.api.model';
import { fontWeightIds } from '../../../models/font-weight.model';

@Injectable({
  providedIn: 'root'
})
export class FontInstanceApiService {

  private baseRoute: string = routes.api._root + routes.api.font._root + routes.api.font.instance._root;

  constructor(
    private http: HttpClient,
    private loggerService: LoggerService
  ) { 
    this.loggerService.enableLogger(true);
  }

  /**
   * Return all from font_instance table
   */
  public getApiFontInstances$(): Observable<any[]> {
    this.loggerService.log('getApiFontInstances');
    
    const apiFontInstances: Observable<FontInstance[]>
      = this.http.get<FontInstance[]>(this.baseRoute);

    return apiFontInstances;
  }

  /**
   * Add a font instance to font_instance table
   */
  public addFontInstance$(fontInstanceApi: FontInstanceApi): Observable<{ id: number }> {
    this.loggerService.log('addFontInstance', JSON.stringify(fontInstanceApi,null,4));

    const route = this.baseRoute + routes.api.font.instance.add;
    const headers = { 'content-type': 'application/json' };
    // remove the ID so we don't try to use it server-side
    const body = { ...fontInstanceApi, id: undefined };
    //const body = this.mapFontInstanceUiToDb(fontInstanceApi);

    const postResponse = this.http.post<{ id: number }>(
      route, 
      body, 
      { 'headers': headers }
    );
    return postResponse;
  }

  public getFontInstanceById$(id: number): Observable<FontInstance> {
    this.loggerService.log('getFontInstanceById', id);
    const fi: Observable<FontInstance> = this.http.get<FontInstance>(this.baseRoute + id);
    return fi;
  }

  private mapFontInstanceUiToDb(fontInstance: FontInstance): FontInstanceApi {
    let fontInstanceApi: FontInstanceApi = {
      //id : fontInstance.id,
      family : fontInstance.family,
      fk_font_weight_id: fontWeightIds.get(fontInstance.weight),
      italic : fontInstance.italic,
      size : fontInstance.size
    }
    return fontInstanceApi;
  }

  // Already convert weight id to FontWeight from string value in db call
  // private mapFontInstanceDbToUi(fontInstance: FontInstanceApi): FontInstance {
  // }
  
}

