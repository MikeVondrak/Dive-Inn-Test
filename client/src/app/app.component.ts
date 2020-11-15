import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppReadyEvent } from './app-ready-event'; // service to send 'appReady' event to index.html to remove pre-bootstap loader element
import { PageLoadingService } from './services/page-loading.service';
import { HeadUriLoaderService } from './services/head-uri-loader/head-uri-loader.service';
import { FontManagerService } from './services/font-manager.service';
import { BaseComponent } from './shared/components/abstract/base/base.component';
import { AppState } from './store/state';
import { loadFontInstances } from './store/font-instance-library/actions/font-instance-library.actions';
import { setDefaultActiveFontSet } from './store/active-font-set/actions/active-font-set.actions';

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
    private store$: Store<AppState>,
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

    // dispatch action to initialize the activeFontSet to a blank state
    this.store$.dispatch(setDefaultActiveFontSet());

    // dispatch action to load font instance list from DB
    this.store$.dispatch(loadFontInstances());
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

