import { Injector } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

/**
 * Class to store a reference to the app Injector
 * - allows base components to register their dependencies manually instead of passing in from all children
 */
export class AppInjector {
  
  private static injector: Injector;
  
  static setInjector(injector: Injector) {
    AppInjector.injector = injector;
  }
  
  static getInjector(): Injector {
    const ai = AppInjector.injector;
    return ai;
  }

}       
