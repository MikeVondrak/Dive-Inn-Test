import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { routes } from '../../../../../../server/src/app/routes';
import { LoggerService } from '../../logger/logger.service';
import { FontWeightApi } from '../font-weight/font-weight.api.model';

@Injectable({
  providedIn: 'root'
})
export class FontWeightApiService {

  private baseRoute: string = routes.api._root + routes.api.font._root + routes.api.font.weight._root;

  constructor(
    private http: HttpClient,
    private loggerService: LoggerService
  ) {
    this.loggerService.enableLogger(true);
  }

  public getFontWeights$(): Observable<FontWeightApi[]> {
    this.loggerService.log('getFontWeights');

    const fontWeights: Observable<FontWeightApi[]>
      = this.http.get<FontWeightApi[]>(this.baseRoute);
  
    return fontWeights;
  }
}

