import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FontInstance } from 'src/app/models/font-instance.model';
import { FontSetListView } from 'src/app/models/font-set.model';
import { UiFont } from 'src/app/models/ui-font.model';
import { FontSetManagerService } from 'src/app/services/font-set-manager/font-set-manager.service';
import { DropdownItem } from 'src/app/shared/components/form-controls/dropdown/dropdown.component';
import { setActiveFontSetById } from 'src/app/store/active-font-set/actions/active-font-set.actions';
import { getUiActiveFontInstance } from 'src/app/store/app.selectors';
import { AppState } from 'src/app/store/state';

import { PageLoadingService } from '../../services/page-loading.service';

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo.page.component.html',
  styleUrls: ['./demo.page.component.scss', '../pages-shared.scss']
})
export class DemoPageComponent implements OnInit {

  public headerStyle = '';
  public textStyle = '';

  public activeFontInstance$: Observable<FontInstance>;
  public fontSetList$: Observable<FontSetListView[]> = this.fontSetManagerService.fontSetsListView$;

  constructor(
    private pageLoadingService: PageLoadingService,
    private store$: Store<AppState>,
    private fontSetManagerService: FontSetManagerService,
  ) {
  }

  ngOnInit(): void {
    this.activeFontInstance$ = this.store$.select(getUiActiveFontInstance);
  }

  selectedFontSetChange($event: DropdownItem) {
    const fontSet: FontSetListView = $event as FontSetListView;
    // TODO: can make this a separate action / store state if we don't want changes in the Demo page affecting Select page
    this.store$.dispatch(setActiveFontSetById({fontSetId: fontSet.setId}))
  }

}
