import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PageLoadingService } from 'src/app/services/page-loading.service';
import { ServerTestService } from 'src/app/services/server-test/server-test.service';
import { ServerTestData } from 'src/app/services/server-test/server-test.model';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection.page.component.html',
  styleUrls: ['./selection.page.component.scss', '../pages-shared.scss']
})
export class SelectionPageComponent implements OnInit {

  public testData$: Observable<ServerTestData[]>;

  constructor(private serverTestService: ServerTestService) {
  }

  ngOnInit(): void {
  }

}
