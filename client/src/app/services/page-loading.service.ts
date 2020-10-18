import { Injectable, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd, Event, NavigationStart } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoggerService } from './logger/logger.service';


@Injectable({
  providedIn: 'root'
})
export class PageLoadingService implements OnInit {

  private pageLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public pageLoading$: Observable<boolean> = this.pageLoadingSubject$.asObservable();

  constructor(
    public router: Router,
    private loggerService: LoggerService
  ) {
    this.loggerService.enableLogger(true);
    router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof NavigationStart)
    ).subscribe((e: RouterEvent) => {
      this.loggerService.log('NavigationStart', e.url, undefined, 'PageLoadingService');
      this.pageLoadingSubject$.next(true);
    });
  }
  
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  public pageLoadingComplete() {
    this.pageLoadingSubject$.next(false);
  }

}
