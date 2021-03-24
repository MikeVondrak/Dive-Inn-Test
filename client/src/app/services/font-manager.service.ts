import { Injectable } from '@angular/core';
import { GoogleFontsApiService } from '../services/external/google/google-fonts-api.service';
import { GoogleFontsApi } from '../services/external/google/google-fonts-api.model';
import { FontApiService } from '../services/api/font/font.api.service';
import { HeadUriLoaderService } from '../services/head-uri-loader/head-uri-loader.service';
import { take, map, tap, filter, reduce, every, switchMap, catchError, delay, withLatestFrom } from 'rxjs/operators';
import { LoggerService } from './logger/logger.service';
import { UiFont, IUiFont, FontListsEnum } from '../models/ui-font.model';
import { FontVariants } from '../services/api/font/font.api.model';
import { Observable, BehaviorSubject, combineLatest, of, Subject } from 'rxjs';
import { FontClickedPayload } from '../shared/components/font-list-display/font-list-display.component';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state';
import { fontFamilyDataLoaded } from '../store/font-library/actions/font-library.actions';
import { FontWeight } from '../models/font-weight.model';

enum DatabaseAction {
  ADD,
  REMOVE
}

enum GoogleFontsDataStateEnum {
  UNLOADED,
  LOADING,
  LOADED,
  ERROR
}
@Injectable({
  providedIn: 'root'
})
export class FontManagerService {

  public allFonts: UiFont[] = [];
  private allFonts$: Observable<UiFont[]>;

  private googleFontCategories: Set<string> = new Set();
  private blacklistedCategories: string[];

  private validCategoryFonts: UiFont[] = [];
  private blacklistedFonts: UiFont[] = [];
  private availableFonts: UiFont[] = [];
  private selectableFonts: UiFont[] = [];
  private fontsToDownload: UiFont[] = [];

  // tslint:disable: variable-name
  private _selectableFonts$: BehaviorSubject<UiFont[]> = new BehaviorSubject<UiFont[]>([]);
  private _blacklistedFonts$: BehaviorSubject<UiFont[]> = new BehaviorSubject<UiFont[]>([]);
  private _availableFonts$: BehaviorSubject<UiFont[]> = new BehaviorSubject<UiFont[]>([]);

  // validCategory
  public get selectableFonts$(): Observable<UiFont[]> { return this._selectableFonts$.asObservable(); }
  public get blacklistedFonts$(): Observable<UiFont[]> { return this._blacklistedFonts$.asObservable(); }
  public get availableFonts$(): Observable<UiFont[]> { return this._availableFonts$.asObservable(); }
  
  private googleFontDataLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private googleFontDataLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private googleFontDataError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private fontsPerPage: number = 10;
  private selectableFontsCurrentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private availableFontsCurrentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private blacklistedFontsCurrentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  

  constructor(
    private googleFontsApiService: GoogleFontsApiService,
    private fontsApiService: FontApiService,
    private headUriService: HeadUriLoaderService,
    private loggerService: LoggerService,
    private store$: Store<AppState>,
  ) {
    this.loggerService.enableLogger(true);
  }

  /**
   * @TODO - comment
   */
  public init(): void {
    // clear data to avoid duplicates when run twice in debugging build
    this.validCategoryFonts = [];
    this.blacklistedFonts = [];
    this.availableFonts = [];
    this.selectableFonts = [];
    this.fontsToDownload = [];

    this.setGoogleFontsDataState(GoogleFontsDataStateEnum.LOADING);
    this.allFonts$ = this.getAllGoogleFonts();
    // subscribe so we have the Google Fonts data available to sort
    //  - fast enough to not be an issue loading on app init
    //  - if we didn't want to load the data unless the UI was using it we could continue the Observable chain and avoid subscribing
    this.allFonts$.subscribe(
      (allFonts: UiFont[]) => {
        this.allFonts = allFonts;
        this.parseFontsData(allFonts);
      },
      (err: any) => {
        this.loggerService.log('Error Handler: ', err);
        /** @TODO hande this in the GoogleFontsApiService / NgRx */
        this.setGoogleFontsDataState(GoogleFontsDataStateEnum.ERROR);
      },
      () => {
        // expect the subscription to complete
        this.setGoogleFontsDataState(GoogleFontsDataStateEnum.LOADED);
      }
    );
  }

  /**
   * @TODO - comment
   */
  public updateFontsState(payload: FontClickedPayload): void {
    const font = payload.fontObj;
    const moveToList = payload.buttonId;

    let newList: FontListsEnum;
    let dbAction: DatabaseAction;

    // determine which list the font is from by listId property in font
    switch (font.properties.listId) {
      case FontListsEnum.BLACKLISTED:
        newList = FontListsEnum.AVAILABLE;
        dbAction = DatabaseAction.REMOVE;
        break;
      case FontListsEnum.SELECTABLE:
        newList = FontListsEnum.AVAILABLE;
        dbAction = DatabaseAction.REMOVE;
        break;
      case FontListsEnum.AVAILABLE:
        dbAction = DatabaseAction.ADD;
        // figure out which list to move the font to, all actions move font from 1 list to another
        switch (moveToList) {
          case "left":
            newList = FontListsEnum.BLACKLISTED;
            break;
          case "right":
            newList = FontListsEnum.SELECTABLE;
            break;
          case FontListsEnum.AVAILABLE:
            throw new Error('Cannot move font, already in Available Fonts: ' + font.family);
            break;
          default: throw new Error('Invalid moveToList argument: ' + moveToList);
        }
        break;
      default: this.loggerService.log('ERROR in updateFontsState - Invalid listId: ', font?.properties?.listId);
    }

    // update which list the font exists in (UI side)
    // - because Available font list is not updated from server data we need to set the new listId for fonts being moved into the Available list
    const oldListId = font.properties.listId;
    font.properties.listId = newList;

    // update db side
    switch (dbAction) { 
      case DatabaseAction.ADD:

        this.fontsApiService.addFont(font).pipe(
          switchMap(addFontSuccessful => {
            this.loggerService.log('FontManagerSerice ADD FONT RESPONSE');
            // if we're adding the font (to Selectable or Blacklisted), it will be removed from Available
            const idx = this.availableFonts.findIndex(f => f.family === font.family);
            // manually remove font from the Available list since it's not updated from server data
            this.availableFonts.splice(idx, 1);
            
            // return updated font list from DB
            return this.fontsApiService.getAllFonts$().pipe(
              map(newDbFonts => {
                // combine variant and category from Google fonts data into return from our DB
                return newDbFonts.map(newDbFont => {
                  const googleFont = this.allFonts.find(f => f.family === newDbFont.family);
                  newDbFont.properties.category = googleFont?.properties?.category;
                  newDbFont.properties.variants = googleFont?.properties?.variants;
                  return newDbFont;
                });
              }),
              catchError(err => {
                // TODO: how to actually handle errors
                font.properties.listId = oldListId;
                return of(null);
              })
            );
          }),
          catchError(err => {
            font.properties.listId = oldListId;
            return of(null);
          })
        ).subscribe((newFontList: UiFont[]) => {
          this.handleUpdatedFontData(newFontList);
        });
        break;

      case DatabaseAction.REMOVE:

        this.fontsApiService.removeFont(font).pipe(
          switchMap(removeFontSuccessful => {
            this.loggerService.log('FontManagerSerice REMOVE FONT RESPONSE');

            // reset ID of font when removing
            font.properties.id = -1;
            // if we're removing the font (from Selectable or Blacklisted), it will be added to Available
            this.availableFonts.push(font);

            // return updated font list from DB
            return this.fontsApiService.getAllFonts$().pipe(
              map(newDbFonts => {
                // combine variant and category from Google fonts data into return from our DB
                return newDbFonts.map(newDbFont => {
                  const googleFont = this.allFonts.find(f => f.family === newDbFont.family);
                  newDbFont.properties.category = googleFont?.properties?.category;
                  newDbFont.properties.variants = googleFont?.properties?.variants;
                  return newDbFont;
                });
              }),
            );
          }),
          catchError(err => {
            return of(null);
          })
        ).subscribe( (newFontList: UiFont[]) => {
          this.handleUpdatedFontData(newFontList);
        });
        break;

      default:
        throw new Error('Invalid database action: ' + dbAction);
    }
    
    this.loggerService.log('updateFontsState: font list: ' + font.properties.listId + ', moveToList: ' + moveToList, font);
  }

  /**
   * @TODO - comment
   */
  public loadFont$(family: string): Observable<string> {
    this.loggerService.log('loadFont$ family: ' + family);
    return this.headUriService.loadFont(family);
  }

  /**
   * Get the list of all Google Fonts and convert to UiFont[]
   */
  private getAllGoogleFonts(): Observable<UiFont[]> {

    // !!! REMOVE THIS !!! - test with small data set
    let fontLimit = 100;
    let fontCount = 0;

    if (!this.allFonts$) {      
      return this.googleFontsApiService.getFonts$('popularity')
        .pipe(
          take(1),
          map(googleFonts => {
            return googleFonts
              .map(googleFont => {              
                return this.mapGoogleFontToUiFont(googleFont);
              })

              // !!! REMOVE THIS !!! - test with small data set
              .filter(googleFont => {
                fontCount++;
                return fontCount <= fontLimit;
              })
            

          }),
        );
    } else {
      return this.allFonts$;
    }
  }

  /**
   * Breaks the set of Google fonts into Selectable, Blacklisted, and Available font lists
   * @param fontsData Set of Google fonts to check against our DB fonts
   */
  private parseFontsData(fontsData: UiFont[]): void {
    combineLatest([
      this.fontsApiService.getAllFonts$().pipe(take(1)), // font data from our DB
      this.googleFontDataLoaded.pipe(filter(loaded => !!loaded), take(1)), // font data loaded from Google API
    ]).pipe(
      take(1), // unsubscribe after getting result
      every(([dbFonts, googleFontsLoaded]) => {
        // iterate through each converted Google font to see if it exists in our DB fonts
        fontsData.forEach(uiFont => {
          this.parseFontCategory(uiFont);
          // match fonts by family only
          const dbFont = dbFonts.find(dbf => dbf.family === uiFont.family);
          uiFont.properties.listId = dbFont?.properties?.listId;
          if (uiFont.properties.listId === FontListsEnum.BLACKLISTED) {
            uiFont.properties.id = dbFont.properties.id;
            this.blacklistedFonts.push(uiFont);
          } else if (uiFont.properties.listId === FontListsEnum.SELECTABLE) {
            uiFont.properties.id = dbFont.properties.id;
            this.selectableFonts.push(uiFont);
          } else {
            uiFont.properties.listId = FontListsEnum.AVAILABLE;
            this.availableFonts.push(uiFont);
          }
        });

        this._selectableFonts$.next(Object.assign([], this.selectableFonts));
        this._blacklistedFonts$.next(Object.assign([], this.blacklistedFonts));
        this._availableFonts$.next(Object.assign([], this.availableFonts));
        return true;
      }
      )).subscribe(() => {
        // subscribe here to trigger the every() since no component is creating a subscription directly
      });
  }

  /**
   * Add the category of the provided font to a Set to capture all category values used by Google fonts
   * @param uiFont font to parse for category value
   */
  private parseFontCategory(uiFont: UiFont) {
    this.googleFontCategories.add(uiFont.properties.category);
  }

  /**
   * Convert the provided GoogleFontsApi into a UiFont
   * @param googleFont GoogleFontsApi to convert
   */
  private mapGoogleFontToUiFont(googleFont: GoogleFontsApi): UiFont {
    const iUiFont: IUiFont = {
      family: googleFont.family,
      // uiText: is populated using family and overwritten if db has different value
      // hrefId: is populated from family and reconstructed when building URI for <link> tag
      properties: {
        id: -1,
        variants: this.parseVariants(googleFont),
        category: googleFont.category,
      },
    };
    return new UiFont(iUiFont);
  }

  /**
   * Crete a FontWeight-boolean map of whether font weight is italic-able
   * @param googleFont Font to parse variants of
   */
  private parseVariants(googleFont: GoogleFontsApi): FontVariants {
    // variants in format:
    //  100, 100italic, 200, 300, regular, italic, 500, 500italic... 900, 900italic
    // convert to:
    //  (100, true), (200, false), (300, false), (regular, true)...
    const variants: FontVariants = googleFont.variants.reduce((resultsMap, variant) => {

      const index = variant.indexOf('italic');
      const italicAble = index >= 0;
      // if variant has 'italic' take part of string before it
      // if variant is 'italic' set italicAble for 'regular' weight
      // else variant is weight
      const weight = index > 0 ? variant.substring(0, index) :
        index === 0 ? 'regular' : variant;

      resultsMap.set(weight as FontWeight, italicAble);

      return resultsMap;
    }, new Map<FontWeight, boolean>());

    if (googleFont.variants.includes('italic')) {
      variants.set('regular', true);
    }
    return variants;
  }

  private setGoogleFontsDataState(state: GoogleFontsDataStateEnum): void {
    switch (state) {
      case GoogleFontsDataStateEnum.UNLOADED:
        // BehaviorSubjects have initial value when created
        break;
      case GoogleFontsDataStateEnum.LOADING:
        this.googleFontDataLoading.next(true);
        break;
      case GoogleFontsDataStateEnum.LOADED:
        this.googleFontDataLoading.next(false);
        this.googleFontDataLoaded.next(true);
        this.googleFontDataError.next(false);
        break;
      case GoogleFontsDataStateEnum.ERROR:
        this.googleFontDataLoading.next(false);
        this.googleFontDataLoaded.next(true);
        this.googleFontDataError.next(true);
        break;
      default: { }
    }
  }

  private handleUpdatedFontData(newFontsList: UiFont[]) {

    // move the font and emit new data
    this.clearFontLists();
    this.populateFontLists(newFontsList);
  }

  private clearFontLists() {
    this.blacklistedFonts = [];
    this.selectableFonts = [];

    this._selectableFonts$.next(this.selectableFonts);
    this._blacklistedFonts$.next(this.blacklistedFonts);
    this._availableFonts$.next(this.availableFonts);
  }
  
  /**
   * Update the Selectable, Blacklisted, and Available font lists with data from POST response
   */
  private populateFontLists(fontsData: UiFont[]) {
    fontsData.forEach(uiFont => {
      if (uiFont.properties.listId === FontListsEnum.BLACKLISTED) {
        this.blacklistedFonts.push(uiFont);
      } else if (uiFont.properties.listId === FontListsEnum.SELECTABLE) {
        this.selectableFonts.push(uiFont);
      } else {
        throw new Error('Should not have AVAILABLE fonts coming from DB');
        this.availableFonts.push(uiFont);
      }
    });
    this._selectableFonts$.next(this.selectableFonts);
    this._blacklistedFonts$.next(this.blacklistedFonts);
  }

  public setFontsPerPage(perPage: number) {
    this.fontsPerPage = perPage;
    // TODO: emit on fontsPerPage subject here when configurable
  }

  public setAvailableFontsPageNumber(pageNumber: number) {
    // emit on availableListPageNumber$ subject here
    this.availableFontsCurrentPage$.next(pageNumber);
    //this.availableFontsCurrentPage = pageNumber;
  }

  public getAvailableFontsByPage$(): Observable<UiFont[]> {
    // const pageNumber = this.availableFontsCurrentPage;
    const perPage = this.fontsPerPage;

    // need a combination of availableFonts$ and availableListPageNumber$
    return combineLatest([
      this.availableFonts$.pipe(filter(fonts => fonts.length > 0)),
      this.availableFontsCurrentPage$
    ]).pipe(
      map(([fonts, currentPage]) => {
        if (currentPage < 1) {
          throw new Error('Font Manager Service getSelectableFontsByPage$ invalid page number requested: ' + currentPage);
        }
        const lastPageNum = Math.ceil(fonts.length / perPage);
        if (currentPage > lastPageNum) {
          throw new Error('Font Manager Service getSelectableFontsByPage$ invalid page number requested: ' + currentPage);
        }
        
        const firstFontIdx = (currentPage - 1) * perPage;
        const page = fonts.slice(firstFontIdx, firstFontIdx + perPage);
        return page;
      })
    );

  }

  // public getBlacklistedFontsByPage$(): Observable<UiFont[]> {
  // }

  // public getSelectableFontsByPage$(): Observable<UiFont[]> {
  // }
  
}
