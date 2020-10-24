import { Component, OnInit, AfterViewInit } from '@angular/core';

// service to send 'appReady' event to index.html to remove pre-bootstap loader element
import { AppReadyEvent } from './app-ready-event';
import { PageLoadingService } from './services/page-loading.service';
import { HeadUriLoaderService } from './services/head-uri-loader/head-uri-loader.service';
// import { GoogleFontsApiResponse } from './services/external/google/google-fonts-api.model';
// import { GoogleFontsApiService } from './services/external/google/google-fonts-api.service';
import { FontManagerService } from './services/font-manager.service';
import { BaseComponent } from './shared/components/abstract/base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit, AfterViewInit {

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
    super();
    // called first time before the ngOnInit()
    this.appReadyEvent = appReady;
    this.loggerService.enableLogger(true);
  }

  ngOnInit(): void {
    this.loggerService.log('ngOnInit');

    // called after the constructor and called once after the first ngOnChanges() (debug mode)
    this.headUriLoader.loadDefaultFonts();
    this.fontManager.init();
  }

  ngAfterViewInit(): void {
    // called once after the first ngAfterContentChecked(), after Angular initializes the component's views and child views
    this.loggerService.log('ngAfterViewInit');

    if (!this.delayAppReadyEvent) {
      this.appReadyEvent.trigger();
      this.loggerService.log('ngAfterViewInit done');
    } else {
      // simulate load time for app
      this.loggerService.log('waiting ' + this.appReadyEventDelay + 'ms to fire appReadyEvent');

      setTimeout(() => {
        this.appReadyEvent.trigger();
        this.loggerService.log('ngAfterViewInit done');
      }, this.appReadyEventDelay);
    }
  }

}

