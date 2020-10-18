import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { AppInjector } from 'src/app/services/app-injector/app-injector.service';

@Component({
  template: '',
})
export abstract class BaseComponent implements OnInit {

  public loggerService: LoggerService;

  constructor() {    
    // manually retrieve the dependencies from the app injector
    // so that constructor has no dependencies that must be passed in from child
    const injector = AppInjector.getInjector();
    this.loggerService = injector.get(LoggerService);
    this.loggerService.enableLogger(true);    
  }

  ngOnInit(): void {
  }

}
