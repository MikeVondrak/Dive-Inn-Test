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
  public availableFontsFiltered$: Observable<UiFont[]> = this.fontManagerService.getAvailableFontsFiltered$();

  public selectableNumberOfPages$: Observable<number>;
  public blacklistedNumberOfPages$: Observable<number>;
  public availableNumberOfPages$: Observable<number>;

  public top100Fonts$: Observable<UiFont[]> = this.availableFonts$.pipe(map(f => f.slice(0, 100)));
  public availableFontsByPage$ = this.fontManagerService.getAvailableFontsByPage$();
  public blacklistedFontsByPage$ = this.fontManagerService.getBlacklistedFontsByPage$();
  public selectableFontsByPage$ = this.fontManagerService.getSelectableFontsByPageWithSets$();
  //public selectableFontsByPage$ = this.fontManagerService.getSelectableFontsByPage$();
  public familyStringsFromSets$ = this.fontManagerService.getFamilyStringsFromSets$();

  public temp$ = this.fontManagerService.getSelectableFontsByPageWithSets$();
  
  private readonly fontsPerPage: number = 10; // TODO: readonly until we want to change how many fonts per page are shown

  constructor(pageLoadingService: PageLoadingService, private fontManagerService: FontManagerService) { 
    super();
    this.loggerService.enableLogger(true);

    this.selectableNumberOfPages$ = this.selectableFonts$.pipe(map(fonts => {
      return Math.ceil(fonts.length / this.fontsPerPage);
    }));
    this.availableNumberOfPages$ = this.availableFontsFiltered$.pipe(map(fonts => {
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

  public availablePageChanged(pageNumber: number) {
    this.fontManagerService.setAvailableFontsPageNumber(pageNumber);
  }
  public selectablePageChanged(pageNumber: number) {
    this.fontManagerService.setSelectableFontsPageNumber(pageNumber);
  }
  public blacklistedPageChanged(pageNumber: number) {
    this.fontManagerService.setBlacklistedFontsPageNumber(pageNumber);
  }
  

  public searchChange(searchText: string) {
    this.fontManagerService.availableFontsSearch(searchText);
  }
}
