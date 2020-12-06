import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FontType } from 'src/app/models/font-type.model';
import { FontTypeState } from 'src/app/store/font-type/entity/font-type.entity';
import { AppState } from 'src/app/store/state';
import { FontTypeApiService } from '../api/font-type/font-type.api.service';
import * as fromFontTypeSelectors from 'src/app/store/font-type/selectors/font-type.selectors';
import { fontTypeAdapter } from 'src/app/store/font-type/entity/font-type.entity';

@Injectable({
  providedIn: 'root'
})
export class FontTypeManagerService {

  public allFontTypes$: Observable<FontType[]>;

  constructor(private store$: Store<AppState>) {
    this.allFontTypes$ = this.store$.select(fromFontTypeSelectors.getAllFontTypes);
  }

}
