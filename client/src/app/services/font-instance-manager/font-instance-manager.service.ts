import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FontInstance } from 'src/app/models/font-instance.model';
import { FontInstanceApiService } from '../api/font-instance/font-instance.api.service';

@Injectable({
  providedIn: 'root'
})
export class FontInstanceManagerService {

  constructor(
    private fontInstanceApiService: FontInstanceApiService
  ) { }

  public getAllFontInstances$(): Observable<FontInstance[]> {
    return this.fontInstanceApiService.getAllFontInstances$();
  }

  public getFontInstanceById$(id: number): Observable<FontInstance> {
    return this.fontInstanceApiService.getFontInstanceById$(id);
  }
  
  public addFontInstance$(fontInstance: FontInstance): Observable<object> {
    return this.fontInstanceApiService.addFontInstance$(fontInstance);
  }
}
