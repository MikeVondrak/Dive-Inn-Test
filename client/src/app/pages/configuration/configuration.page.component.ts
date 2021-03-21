import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FontManagerService } from '../../services/font-manager.service';
import { UiFont, FontListsEnum } from '../../models/ui-font.model';
import { map } from 'rxjs/operators';
import { PageLoadingService } from 'src/app/services/page-loading.service';
import { FontClickedPayload } from '../../shared/components/font-list-display/font-list-display.component';
import { BaseComponent } from 'src/app/shared/components/abstract/base/base.component';


@Component({
  selector: 'app-configuration-page',
  templateUrl: './configuration.page.component.html',
  styleUrls: ['./configuration.page.component.scss', '../pages-shared.scss']
})
export class ConfigurationPageComponent extends BaseComponent implements OnInit, AfterViewInit {

  public fontListsEnum = FontListsEnum;

  public selectableFonts$: Observable<UiFont[]> = this.fontManagerService.selectableFonts$;
  public blacklistedFonts$: Observable<UiFont[]> = this.fontManagerService.blacklistedFonts$;
  public availableFonts$: Observable<UiFont[]> = this.fontManagerService.availableFonts$;

  public selectableNumberOfPages$: Observable<number>;
  public blacklistedNumberOfPages$: Observable<number>;
  public availableNumberOfPages$: Observable<number>;

  public top100Fonts$: Observable<UiFont[]> = this.availableFonts$.pipe(map(f => f.slice(0, 100)));
  
  private readonly fontsPerPage: number = 10; // TODO: readonly until we want to change how many fonts per page are shown

  constructor(pageLoadingService: PageLoadingService, private fontManagerService: FontManagerService) { 
    super();
    this.loggerService.enableLogger(true);

    this.selectableNumberOfPages$ = this.selectableFonts$.pipe(map(fonts => {
      return Math.ceil(fonts.length / this.fontsPerPage);
    }));
    this.availableNumberOfPages$ = this.availableFonts$.pipe(map(fonts => {
      return Math.ceil(fonts.length / this.fontsPerPage);
    }));
    this.blacklistedNumberOfPages$ = this.blacklistedFonts$.pipe(map(fonts => {
      return Math.ceil(fonts.length / this.fontsPerPage);
    }));
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  }

  public fontClick($event: FontClickedPayload) {
    this.loggerService.log('fontClick: ' + $event.fontObj.uiText + ', button: ' + $event.buttonId);
    this.fontManagerService.updateFontsState($event);
  }
}
