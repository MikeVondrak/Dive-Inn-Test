import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
//import { FontManagerService } from '../../services/font-manager/font-manager.service';
//import { UiFont, FontListsEnum } from '../../models/ui-font.model';
import { map } from 'rxjs/operators';
import { PageLoadingService } from 'src/app/services/page-loading.service';
//import { FontClickedPayload } from '../../shared/components/font-list-display/font-list-display.component';


@Component({
  selector: 'app-configuration-page',
  templateUrl: './configuration.page.component.html',
  styleUrls: ['./configuration.page.component.scss', '../pages-shared.scss']
})
export class ConfigurationPageComponent implements OnInit, AfterViewInit {

  // public fontListsEnum = FontListsEnum;

  // public selectableFonts$: Subject<UiFont[]> = this.fontManagerService.selectableFonts$;
  // public blacklistedFonts$: Subject<UiFont[]> = this.fontManagerService.blacklistedFonts$;
  // public availableFonts$: Subject<UiFont[]> = this.fontManagerService.availableFonts$;
  // public top100Fonts$: Observable<UiFont[]> = this.availableFonts$.pipe(map(f => f.slice(0, 100)));

  // constructor(private fontManagerService: FontManagerService) { }
  constructor(pageLoadingService: PageLoadingService) { 
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  }

  // public fontClick($event: FontClickedPayload) {
    
  //   console.log('%%%%% configuration page fontClick: ' + $event.fontObj.uiText + ', button: ' + $event.buttonId);
    
  //   this.fontManagerService.updateFontsState($event);
  // }
}
