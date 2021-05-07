import { Injectable } from '@angular/core';
// import { FontSetApiService } from '../api/font-set/font-set.api.service';
// import { FontInstanceApiService } from '../api/font-instance/font-instance.api.service';
import { FontInstance } from 'src/app/models/font-instance.model';
import { Observable } from 'rxjs';
import { FontSet } from 'src/app/models/font-set.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
//import { ActiveFontSetState } from 'src/app/store/active-font-set/active-font-set.state';
import { loadFontSets, createFontSet, updateFontSet } from 'src/app/store/font-set-library/actions/font-set.actions';
import { getFontSetsListView } from 'src/app/store/font-set-library/selectors/font-set-library.selectors';
//import { getActiveFontSet } from 'src/app/store/active-font-set/selectors/active-font-set.selectors';
import { FontSetState } from 'src/app/store/font-set-library/entity/font-set.entity';
import { FontSetApi, FontSetApiMapped } from '../api/font-set/font-set.api.model';
import { map } from 'rxjs/operators';
import { FontSetApiService } from '../api/font-set/font-set.api.service';
import { FontTypes, FontTypeInstanceMap } from 'src/app/models/font-type.model';
import { getUiActiveFontSetTypeInstances } from 'src/app/store/app.selectors';

@Injectable({
  providedIn: 'root'
})
export class FontSetManagerService {

  public fontSetsListView$ = this.store$.select(getFontSetsListView);
  private activeFontSetTypeInstanceMap$: Observable<FontTypeInstanceMap> = this.store$.select(getUiActiveFontSetTypeInstances);

  constructor(
    // TODO: how to use a slice of the store instead of entire AppState?
    private store$: Store<AppState>,
    private fontSetApiService: FontSetApiService
  ) { }

  public loadFontSets$(): void {
    this.store$.dispatch(loadFontSets());
  }

  public updateFontSet$(updatedFontSetApi: FontSetApiMapped): void {
    this.store$.dispatch(updateFontSet({ updatedFontSetApi: updatedFontSetApi }));
  }

  public createFontSet$(newFontSet: FontSetApiMapped): Observable<FontSetApiMapped> {
    return this.fontSetApiService.createFontSet$(newFontSet);
  }

  public deleteFontSet$(fontSetId: string): Observable<boolean> {
    return this.fontSetApiService.deleteFontSet$(fontSetId);
  }

  public getFontInstanceForType$(fontType: FontTypes): Observable<FontInstance> {
    return this.activeFontSetTypeInstanceMap$.pipe(
      map((tiMap: FontTypeInstanceMap) => {
        const defaultFontInstance: FontInstance = {
          family: 'Roboto',
          italic: false,
          size: 16,
          weight: 'normal',
          id: -1
        };
        const arr = Array.from(tiMap);
        let key;
        if (arr.length > 0) {
          key = arr?.find(ti => ti[0].type === fontType)[0];
          //debugger;
        }
        return key ? tiMap.get(key) : defaultFontInstance;
      })
    );
  }
}