import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FontInstance } from 'src/app/models/font-instance.model';
import { UiFont } from 'src/app/models/ui-font.model';
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

  constructor(
    private pageLoadingService: PageLoadingService,
    private store$: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.activeFontInstance$ = this.store$.select(getUiActiveFontInstance);
  }

}
