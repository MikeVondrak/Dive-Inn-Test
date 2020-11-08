import { Injectable } from '@angular/core';
import { FontTypeApiService } from '../api/font-type/font-type.api.service';

@Injectable({
  providedIn: 'root'
})
export class FontTypeManagerService {

  constructor(private fontTypeApiService: FontTypeApiService) { }

  public getAllFontTypes$() {
    return this.fontTypeApiService.getAllFontTypes$();
  }
}
