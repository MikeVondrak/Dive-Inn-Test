import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { AppInjector } from 'src/app/services/app-injector/app-injector.service';

@Component({
  template: '',
})
export abstract class BaseComponent implements OnInit {

  public loggerService: LoggerService;

  constructor() {
    // https://devblogs.microsoft.com/premier-developer/angular-how-to-simplify-components-with-typescript-inheritance/
    // Manually retrieve the dependencies from the injector    
    // so that constructor has no dependencies that must be passed in from child

    //const injector = AppInjector.getInjector$();
    //this.loggerService = injector?.get(LoggerService);
    debugger;
    AppInjector.getInjector$().subscribe(injector => {
      debugger;
      this.loggerService = injector.get(LoggerService)
    })
  }

  ngOnInit(): void {
  }

}
