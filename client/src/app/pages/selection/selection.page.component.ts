import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection.page.component.html',
  styleUrls: ['./selection.page.component.scss', '../pages-shared.scss']
})
export class SelectionPageComponent implements OnInit {

  private readonly defaultFontInstance: FontInstance = {
    family: '',
    italic: false,
    size: 36,
    weight: '100',
  }

  public selectableFonts$: Observable<UiFont[]> = this.fontManagerService.selectableFonts$;
  public fontInstance: FontInstance = { ...this.defaultFontInstance };
  public activeFontInstance$: Observable<FontInstance>;

  constructor(
    private serverTestService: ServerTestService,
    private fontManagerService: FontManagerService,
    private store$: Store<AppState>,
  ) {
    this.activeFontInstance$ = this.store$.select<FontInstance>(getActiveFontInstance);
  }

  ngOnInit(): void {   

  }

  public fontInstanceChange($event) {
    this.fontInstance = {...$event};
    this.store$.dispatch(setActiveFontInstance({ fontInstance: this.fontInstance }));
    console.log('SELECTION PAGE fontInstanceChange: ' + JSON.stringify($event, null, 4));
  }

}
