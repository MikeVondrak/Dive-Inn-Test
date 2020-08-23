import { Component, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PageLoadingService } from 'src/app/services/page-loading.service';
import { Router, NavigationStart, RouterEvent, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-page-loading',
  templateUrl: './page-loading.component.html',
  styleUrls: ['./page-loading.component.scss']
})
export class PageLoadingComponent implements AfterViewInit {

  public loading$: Observable<boolean>;
  public loadingComplete: boolean = false;
  
  constructor(private pageLoadingService: PageLoadingService, public router: Router) {
    this.loading$ = pageLoadingService.pageLoading$;

    router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof NavigationStart)
    ).subscribe((e: RouterEvent) => {
      console.log('NavigationStart event: ' + e.url);
      this.loadingComplete = false;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadingComplete = true;
      setTimeout(() => {
        this.pageLoadingService.pageLoadingComplete();
      }, 200);
    }, 100);
    
  }

}
