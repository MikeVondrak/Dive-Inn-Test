import { Injector } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
  
export class AppInjector {
  
  private static injector: Injector;
  private static num: number;
  
  static setInjector(injector: Injector) {
    AppInjector.injector = injector;

    AppInjector.num = 1;

    debugger;
  }
  
  static getInjector(): Injector {
    const ai = AppInjector.injector;

    const a = AppInjector.num;
    debugger;
    return ai;
  }


  private static injector$: Subject<Injector> = new Subject<Injector>();
  static setInjector$(injector: Injector) {
    AppInjector.injector$.next(injector);
    debugger;
  }
  
  static getInjector$(): Observable<Injector> {
    return AppInjector.injector$.asObservable();
  }

}       
