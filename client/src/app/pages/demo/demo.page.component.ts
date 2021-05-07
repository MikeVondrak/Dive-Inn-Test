import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StyleFontDirective } from 'src/app/directives/style-font/style-font.directive';
import { FontInstance } from 'src/app/models/font-instance.model';
import { FontSet, FontSetListView } from 'src/app/models/font-set.model';
import { FontType, FontTypeInstanceMap, FontTypes } from 'src/app/models/font-type.model';
import { UiFont } from 'src/app/models/ui-font.model';
import { FontSetApiMapped } from 'src/app/services/api/font-set/font-set.api.model';
import { FontSetManagerService } from 'src/app/services/font-set-manager/font-set-manager.service';
import { DropdownItem } from 'src/app/shared/components/form-controls/dropdown/dropdown.component';
import { setActiveFontSetById } from 'src/app/store/active-font-set/actions/active-font-set.actions';
import { getActiveFontSet, getActiveFontSetId, getActiveFontSetName } from 'src/app/store/active-font-set/selectors/active-font-set.selectors';
import { getUiActiveFontInstance, getUiActiveFontSetTypeInstances } from 'src/app/store/app.selectors';
import { AppState } from 'src/app/store/state';

import { PageLoadingService } from '../../services/page-loading.service';

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo.page.component.html',
  styleUrls: ['./demo.page.component.scss', '../pages-shared.scss'],
})
export class DemoPageComponent implements OnInit {

  public headerStyle = '';
  public textStyle = '';

  public activeFontInstance$: Observable<FontInstance>;
  public fontSetList$: Observable<FontSetListView[]> = this.fontSetManagerService.fontSetsListView$;
  public activeFontSetId$: Observable<string> = this.store$.select(getActiveFontSetId);
  public activeFontSet$: Observable<FontSetApiMapped> = this.store$.select(getActiveFontSet);

  private activeFontSetTypeInstanceMap$: Observable<FontTypeInstanceMap> = this.store$.select(getUiActiveFontSetTypeInstances);

  constructor(
    private pageLoadingService: PageLoadingService,
    private store$: Store<AppState>,
    private fontSetManagerService: FontSetManagerService,
  ) {
  }

  ngOnInit(): void {
    this.activeFontInstance$ = this.store$.select(getUiActiveFontInstance);
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

  selectedFontSetChange(selectedFontSet: FontSetListView) {
    // TODO: can make this a separate action / store state if we don't want changes in the Demo page affecting Select page
    this.store$.dispatch(setActiveFontSetById({fontSetId: selectedFontSet.setId}))
  }

}
