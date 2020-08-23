import { Component, OnInit } from '@angular/core';

import { PageLoadingService } from '../../services/page-loading.service';

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo.page.component.html',
  styleUrls: ['./demo.page.component.scss', '../pages-shared.scss']
})
export class DemoPageComponent implements OnInit {

  public headerStyle = '';
  public textStyle = '';

  constructor(pageLoadingService: PageLoadingService) { 
  }

  ngOnInit(): void {
  }

}
