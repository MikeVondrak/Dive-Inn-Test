import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { PageLoadingService } from 'src/app/services/page-loading.service';
import { ServerTestService } from 'src/app/services/server-test/server-test.service';
import { FontManagerService } from '../../services/font-manager.service'
import { ServerTestData } from 'src/app/services/server-test/server-test.model';
import { UiFont } from 'src/app/models/ui-font.model';
import { FontInstance } from 'src/app/models/font-instance.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { setActiveFontInstance } from 'src/app/store/active-font-instance/actions/active-font-instance.actions';
import { getActiveFontInstance } from 'src/app/store/active-font-instance/selectors/active-font-instance.selectors';
import { getFontDataLoading } from 'src/app/store/font-library/selectors/font-library.selectors';
import { BaseComponent } from 'src/app/shared/components/abstract/base/base.component';
import { FontSet } from 'src/app/models/font-set.model';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection.page.component.html',
  styleUrls: ['./selection.page.component.scss', '../pages-shared.scss']
})
export class SelectionPageComponent extends BaseComponent implements OnInit {

  private readonly defaultFontInstance: FontInstance = {
    family: '',
    italic: false,
    size: 36,
    weight: '100',
  }

  public selectableFonts$: Observable<UiFont[]> = this.fontManagerService.selectableFonts$;
  public fontInstance: FontInstance = { ...this.defaultFontInstance };
  public activeFontInstance$: Observable<FontInstance>;
  public fontInstanceLoading$: Observable<boolean>;
  public fontSetList$: Observable<FontSet[]> = of([]);

  constructor(
    private serverTestService: ServerTestService,
    private fontManagerService: FontManagerService,
    private store$: Store<AppState>,
  ) {
    super();
    this.loggerService.enableLogger(true);
    this.activeFontInstance$ = this.store$.select<FontInstance>(getActiveFontInstance);
    this.fontInstanceLoading$ = this.store$.select<boolean>(getFontDataLoading);
  }

  ngOnInit(): void {   
  }

  public fontInstanceChange($event) {
    this.loggerService.log('fontInstanceChange', $event);
    this.fontInstance = {...$event};
    this.store$.dispatch(setActiveFontInstance({ fontInstance: this.fontInstance }));
  }

}
