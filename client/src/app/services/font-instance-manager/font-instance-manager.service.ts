import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FontInstance } from 'src/app/models/font-instance.model';
import { FontInstanceApiService } from '../api/font-instance/font-instance.api.service';
import * as fromAppSelectors from 'src/app/store/app.selectors';
import { FontInstanceApi } from '../api/font-instance/font-instance.api.model';

@Injectable({
  providedIn: 'root'
})
export class FontInstanceManagerService {

public apiFontInstances$: Observable<FontInstance[]> = this.store$.select(fromAppSelectors.getUiFontInstances);

  constructor(
    private fontInstanceApiService: FontInstanceApiService,
    private store$: Store,
  ) { }

  // TODO: should be a selector?
  public getFontInstanceById$(id: number): Observable<FontInstance> {
    return this.fontInstanceApiService.getFontInstanceById$(id);
  }
  
  public addFontInstance$(fontInstanceApi: FontInstanceApi): Observable<object> {
    return this.fontInstanceApiService.addFontInstance$(fontInstanceApi);
  }
}
