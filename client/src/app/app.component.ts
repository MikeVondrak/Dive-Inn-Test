import { Component, OnInit, AfterViewInit } from '@angular/core';

// service to send 'appReady' event to index.html to remove pre-bootstap loader element
import { AppReadyEvent } from './app-ready-event';
import { PageLoadingService } from './services/page-loading.service';
import { HeadUriLoaderService } from './services/head-uri-loader/head-uri-loader.service';
// import { GoogleFontsApiResponse } from './services/external/google/google-fonts-api.model';
// import { GoogleFontsApiService } from './services/external/google/google-fonts-api.service';
import { FontManagerService } from './services/font-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {

  public loading$ = this.pageLoadingService.pageLoading$;

  private appReadyEvent: AppReadyEvent;
  private title = 'The Dive Inn';
  private viewCheckedOnce = false;

  delayAppReadyEvent = false;
  appReadyEventDelay = 5000;

  constructor(
    appReady: AppReadyEvent,
    private pageLoadingService: PageLoadingService,
    private headUriLoader: HeadUriLoaderService, 
    private fontManager: FontManagerService
  ) {
    // called first time before the ngOnInit()
    this.appReadyEvent = appReady;
  }

  ngOnInit(): void {
    console.log('*****************************************');
    // called after the constructor and called once after the first ngOnChanges()
    this.headUriLoader.loadFontsLink();
    this.fontManager.init();
  }

  ngAfterViewInit(): void {
    // called once after the first ngAfterContentChecked(), after Angular initializes the component's views and child views
    console.log('ngAfterViewInit done');

    if (!this.delayAppReadyEvent) {
      this.appReadyEvent.trigger();
      console.log('ngAfterViewInit done');
    } else {
      // simulate load time for app
      console.log('waiting ' + this.appReadyEventDelay + 'ms to fire appReadyEvent');

      const self = this;
      setTimeout(() => {
        self.appReadyEvent.trigger();
        console.log('ngAfterViewInit done');
      }, this.appReadyEventDelay);
    }
  }

}

