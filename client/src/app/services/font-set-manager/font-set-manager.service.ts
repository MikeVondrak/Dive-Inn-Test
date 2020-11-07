import { Injectable } from '@angular/core';
import { FontSetApiService } from '../api/font-set/font-set.api.service';

@Injectable({
  providedIn: 'root'
})
export class FontSetManagerService {

  constructor(private fontSetApiService: FontSetApiService) { }

  public getAllFontSets$() {
    return this.fontSetApiService.getAllFontSets$();
  }

}
