import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FontType } from 'src/app/models/font-type.model';
import { AppState } from 'src/app/store/state';
import { FontTypeApiService } from '../api/font-type/font-type.api.service';

@Injectable({
  providedIn: 'root'
})
export class FontTypeManagerService {

  public allFontTypes$: Observable<FontType[]>;

  constructor(private store$: Store<AppState>) { 
    this.allFontTypes$ = this.store$.select(getAllFontTypes);
  }

  // public getAllFontTypes$() {
  //   return this.fontTypeApiService.getAllFontTypes$();
  // }
}
