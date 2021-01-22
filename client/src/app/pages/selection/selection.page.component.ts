import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PageLoadingService } from 'src/app/services/page-loading.service';
import { ServerTestService } from 'src/app/services/server-test/server-test.service';
import { FontManagerService } from '../../services/font-manager.service';
import { FontSetManagerService } from '../../services/font-set-manager/font-set-manager.service';
import { UiFont } from 'src/app/models/ui-font.model';
import { defaultFontInstance, FontInstance } from 'src/app/models/font-instance.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { setActiveFontInstance } from 'src/app/store/active-font-instance/actions/active-font-instance.actions';
import { getActiveFontInstance } from 'src/app/store/active-font-instance/selectors/active-font-instance.selectors';
import { getFontDataLoading } from 'src/app/store/font-library/selectors/font-library.selectors';
import { BaseComponent } from 'src/app/shared/components/abstract/base/base.component';
import { FontSet, FontSetListView } from 'src/app/models/font-set.model';
import { FontInstanceApi } from 'src/app/services/api/font-instance/font-instance.api.model';
import { getUiActiveFontInstance } from 'src/app/store/app.selectors';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection.page.component.html',
  styleUrls: ['./selection.page.component.scss', '../pages-shared.scss']
})
export class SelectionPageComponent extends BaseComponent implements OnInit {

  public selectableFonts$: Observable<UiFont[]> = this.fontManagerService.selectableFonts$;
  public fontInstance: FontInstance;
  
  public activeFontInstance$: Observable<FontInstance>;
  //public uiActiveFontInstance$: Observable<FontInstance>;
  public fontInstanceLoading$: Observable<boolean>;
  // public fontSetList$: Observable<FontSet[]> = this.fontSetManagerService.getAllFontSets$();
  public fontSetList$: Observable<FontSetListView[]> = this.fontSetManagerService.fontSetsListView$;

  constructor(
    private serverTestService: ServerTestService,
    private fontManagerService: FontManagerService,
    private fontSetManagerService: FontSetManagerService,
    private store$: Store<AppState>,
  ) {
    super();
    this.loggerService.enableLogger(true);
    this.activeFontInstance$ = this.store$.select<FontInstance>(getUiActiveFontInstance);
    this.fontInstanceLoading$ = this.store$.select<boolean>(getFontDataLoading);
  }

  ngOnInit(): void {
    this.activeFontInstance$.subscribe(afi => {
      this.fontInstance = {...afi};
    })
  }

  public fontInstanceChange(newFontInstance: FontInstance) {
    this.loggerService.log('fontInstanceChange', newFontInstance);
    this.fontInstance = {...newFontInstance};

    // this currently has no effect, only a tap
    this.store$.dispatch(setActiveFontInstance({ fontInstance: {...this.fontInstance} }));
  }

}
