import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { PageLoadingService } from 'src/app/services/page-loading.service';
import { ServerTestService } from 'src/app/services/server-test/server-test.service';
import { FontManagerService } from '../../services/font-manager.service'
import { ServerTestData } from 'src/app/services/server-test/server-test.model';
import { UiFont } from 'src/app/models/ui-font.model';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection.page.component.html',
  styleUrls: ['./selection.page.component.scss', '../pages-shared.scss']
})
export class SelectionPageComponent implements OnInit {

  public selectableFonts$: Observable<UiFont[]> = this.fontManagerService.selectableFonts$;

  constructor(private serverTestService: ServerTestService, private fontManagerService: FontManagerService) {
  }

  ngOnInit(): void {   

  }

  public fontInstanceChange($event) {
    console.log('SELECTION PAGE fontInstanceChange: ' + JSON.stringify($event, null, 4));
  }

}
