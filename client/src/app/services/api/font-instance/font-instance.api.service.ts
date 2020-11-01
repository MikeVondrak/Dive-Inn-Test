import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FontInstance } from 'src/app/models/font-instance.model';
import { routes } from '../../../../../../server/src/app/routes';
import { LoggerService } from '../../logger/logger.service';

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

    const a: Observable<any[]>
      = this.http.get<any[]>(this.baseRoute);
    return a;
  }

  /**
   * Add a font instance to font_instance table
   */
  public addFontInstance(fontInstance: FontInstance): Observable<any> {
    this.loggerService.log('addFontInstance', JSON.stringify(fontInstance,null,4));
    
    const a: Observable<any[]>
      = this.http.get<any[]>(this.baseRoute + routes.api.font.instance.add);
    return a;
  }
}
