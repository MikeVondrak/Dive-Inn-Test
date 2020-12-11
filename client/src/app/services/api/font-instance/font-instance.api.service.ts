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
  public getAllFontInstances$(): Observable<any[]> {
    this.loggerService.log('getAllFontInstances');
    
    const allFontInstances: Observable<FontInstance[]>
      = this.http.get<FontInstance[]>(this.baseRoute);

    return allFontInstances;
  }

  /**
   * Add a font instance to font_instance table
   */
  public addFontInstance$(fontInstance: FontInstance): Observable<object> {
    this.loggerService.log('addFontInstance', JSON.stringify(fontInstance,null,4));
    const route = this.baseRoute + routes.api.font.instance.add;
    const headers = { 'content-type': 'application/json' };
    const body = this.mapFontInstanceUiToDb(fontInstance);
    //debugger;
    const postResponse = this.http.post(
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
      id : fontInstance.id,
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

