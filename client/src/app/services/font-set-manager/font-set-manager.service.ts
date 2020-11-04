import { Injectable } from '@angular/core';
import { FontSetApiService } from '../api/font-set/font-set.api.service';

@Injectable({
  providedIn: 'root'
})
export class FontSetManagerService {

  constructor(private fontSetApiService: FontSetApiService) { }

  getAllFontSets() {
    this.fontSetApiService.getAllFontSets();
  }

}
