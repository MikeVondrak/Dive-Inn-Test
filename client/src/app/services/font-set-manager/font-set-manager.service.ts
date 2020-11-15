import { Injectable } from '@angular/core';
import { FontSetApiService } from '../api/font-set/font-set.api.service';
import { FontInstanceApiService } from '../api/font-instance/font-instance.api.service';
import { FontInstance } from 'src/app/models/font-instance.model';

@Injectable({
  providedIn: 'root'
})
export class FontSetManagerService {

  constructor(
    private fontSetApiService: FontSetApiService,
  ) { }

  public getAllFontSets$() {
    return this.fontSetApiService.getAllFontSets$();
  }

}
