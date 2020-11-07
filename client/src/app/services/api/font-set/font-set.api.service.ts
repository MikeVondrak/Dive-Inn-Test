import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { groupBy, map } from 'rxjs/operators';
import { FontSet } from 'src/app/models/font-set.model';
import { FontSetApi } from '../../../services/api/font-set/font-set.api.model';
import { routes } from '../../../../../../server/src/app/routes';

@Injectable({
  providedIn: 'root'
})
export class FontSetApiService {

  private baseRoute: string = routes.api._root + routes.api.font._root + routes.api.font.fontSet._root;


  constructor(private http: HttpClient) { }

  public getAllFontSets$(): Observable<any[]> {
    const allFontSets: Observable<FontSet[]>
      = this.http.get<FontSetApi[]>(this.baseRoute).pipe(        
        map(fontSetApiArray => {
          const groupedSet = fontSetApiArray.reduce(
            (accum, item) => {
              let newSet = true;
              accum.forEach(fontSet => {
                if (item.set_id === fontSet.setId) {
                  fontSet.typeInstanceMap.set(item.type, item.fk_font_instance_id);
                  newSet = false;
                }
              });
              if (newSet) {
                const newFontSet: FontSet = {
                  setId: item.set_id,
                  name: item.set_name,
                  lastUpdated: new Date,
                  typeInstanceMap: new Map<string, number>()
                }
                newFontSet.typeInstanceMap.set(item.type, item.fk_font_instance_id);
                accum.push(newFontSet);
              }
              return accum;
            },
            new Array<FontSet>()
          );          
          return groupedSet;
        })
      );
      
      return allFontSets;
  }

}
