import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// shared from backend
import { routes, FontGroupEnum } from '../../../../../../server/src/app/routes';

import { UiFont, IUiFont, FontListsEnum } from '../../../models/ui-font.model';
import { FontApi, FontWeight } from './font.api.model';
import { map } from 'rxjs/operators';
import { LoggerService } from '../../logger/logger.service';

@Injectable({
  providedIn: 'root',
})
export class FontApiService {
  constructor(
    private http: HttpClient,
    private loggerService: LoggerService
  ) {
    this.loggerService.enableLogger(true);
  }

  /**
   * Return all Font objects from font table
   */
  public getAllFonts$(): Observable<UiFont[]> {
    const dbFonts: Observable<FontApi[]>
      = this.http.get<FontApi[]>(
          routes.api._root + routes.api.font._root
    );
    return this.mapDbFontsToUiFonts(dbFonts);
  }

  public addFont(font: UiFont): Observable<object> {
    this.loggerService.log('addFont', font.family);
    
    const headers = { 'content-type': 'application/json' };
    const body = this.mapUiFontToDbFont(font);

    const postResponse = this.http.post(
      routes.api._root + routes.api.font._root + routes.api.font.add, 
      body,
      { 'headers': headers }
    );
    
    return postResponse;
  }

  public removeFont(font: UiFont): Observable<object> {
    this.loggerService.log('removeFont', font.family);

    const headers = { 'content-type': 'application/json' };
    const body = { id: font.properties.id };

    const postResponse = this.http.post(
      routes.api._root + routes.api.font._root + routes.api.font.remove,
      body,
      { 'headers': headers }
    );

    return postResponse;
  }

  /**
   * Map db results to UiFont
   * @param dbFonts fonts from db table
   */
  private mapDbFontsToUiFonts(dbFonts: Observable<FontApi[]>): Observable<UiFont[]> {
    const uiFontArray: Observable<UiFont[]> = dbFonts.pipe(
      map((fontArray: FontApi[]) => {
        return fontArray.map((font: FontApi) => {
          return this.mapDbFontToUiFont(font);
        });
      })
    );
    return uiFontArray;
  }

  private mapDbFontToUiFont(font: FontApi): UiFont {
    const listId = font.blacklisted ? FontListsEnum.BLACKLISTED : font.selectable ? FontListsEnum.SELECTABLE : FontListsEnum.AVAILABLE;
    const uiFont: IUiFont = {
      family: font.family,
      uiText: '',
      hrefId: '',
      properties: {
        id: font.id,
        listId: listId
      },
    };
    return new UiFont(uiFont);
  }

  private mapUiFontToDbFont(uiFont: UiFont): FontApi {
    let isSelectable: boolean = false;
    let isBlacklisted: boolean = false;
    if (uiFont.properties.listId === "SELECTABLE") {
      isSelectable = true;
    } else if (uiFont.properties.listId === "BLACKLISTED") {
      isBlacklisted = true;
    }
    let fontApi: FontApi = {
      family: uiFont.family,
      selectable: isSelectable,
      blacklisted: isBlacklisted,
    }
    return fontApi;
  }
}
