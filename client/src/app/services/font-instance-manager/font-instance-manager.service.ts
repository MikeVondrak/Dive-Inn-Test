import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FontInstance } from 'src/app/models/font-instance.model';
import { getAllFontInstances } from 'src/app/store/font-instance-library/selectors/font-instance-library.selectors';
import { FontInstanceApiService } from '../api/font-instance/font-instance.api.service';
import * as fromFontInstanceSelectors from 'src/app/store/font-instance-library/selectors/font-instance-library.selectors';

@Injectable({
  providedIn: 'root'
})
export class FontInstanceManagerService {

public allFontInstances$: Observable<FontInstance[]> = this.store$.select(fromFontInstanceSelectors.getAllFontInstances);

  constructor(
    private fontInstanceApiService: FontInstanceApiService,
    private store$: Store,
  ) { }

  // public getAllFontInstances$(): Observable<FontInstance[]> {
  //   return this.store$.select(getAllFontInstances);
  // }

  public getFontInstanceById$(id: number): Observable<FontInstance> {
    return this.fontInstanceApiService.getFontInstanceById$(id);
  }
  
  public addFontInstance$(fontInstance: FontInstance): Observable<object> {
    return this.fontInstanceApiService.addFontInstance$(fontInstance);
  }
}
