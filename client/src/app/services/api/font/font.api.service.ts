import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// shared from backend
import { routes, FontGroupEnum } from '../../../../../../server/src/app/routes';

import { UiFont, IUiFont, FontListsEnum } from '../../../models/ui-font.model';
import { FontApi, FontWeight } from './font.api.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FontApiService {
  constructor(private http: HttpClient) {}

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
    // TODO
    console.log('ADD FONT: ' + font.family);
    
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
    console.log('REMOVE FONT: ' + font.family);

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
    console.log('font.api mapDbToUi');    
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
      uiText: '',//font.label,
      hrefId: '',//font.href,
      properties: {
        id: font.id,
        //variants: new Map<FontWeight, boolean>([[font.weight, font.italic]]),
        //category: font.category,
        listId: listId
      },
    };
    console.log('font.api mapDbToUi font: ');
    console.log(uiFont);
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
      //id: uiFont.properties.id,
      //label: uiFont.uiText,
      //href: uiFont.hrefId, // refactor and remove? can construct from family
      
      //variants: uiFont.properties.variants,
      selectable: isSelectable,
      blacklisted: isBlacklisted,
      // TODO: refactor and remove these?
      //italic: false,
      //category: "text",
      //weight: "100",
    }
    return fontApi;
  }
}
