import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { routes } from '../../../../../../server/src/app/routes';
import { LoggerService } from '../../logger/logger.service';
import { FontType } from '../../../models/font-type.model';

@Injectable({
  providedIn: 'root'
})
export class FontTypeApiService {

  private baseRoute: string = routes.api._root + routes.api.font._root + routes.api.font.type._root;

  constructor(
    private http: HttpClient,
    private loggerService: LoggerService
  ) { 
    this.loggerService.enableLogger(true);
  }

  /**
   * Return all from font_type table
   */
  public getAllFontTypes$(): Observable<FontType[]> {
    this.loggerService.log('getAllFontTypes');

    const allFontTypes: Observable<FontType[]>
      = this.http.get<FontType[]>(this.baseRoute);
    return allFontTypes;
  }
}
