import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { routes } from '../../../../../../server/src/app/routes';
import { FontWeightApi } from '../font-weight/font-weight.api.model';

@Injectable({
  providedIn: 'root'
})
export class FontWeightApiService {

  private baseRoute: string = routes.api._root + routes.api.font._root + routes.api.font.weight._root;

  constructor(private http: HttpClient) { }

  public getFontWeights$(): Observable<FontWeightApi[]> {
    const fontWeights: Observable<FontWeightApi[]>
      = this.http.get<FontWeightApi[]>(this.baseRoute);
  
    return fontWeights;
  }
}

