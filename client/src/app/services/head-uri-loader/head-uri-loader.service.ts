import { Injectable, Renderer2, Inject, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { fonts } from './head-uri-loader.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { fontFamilyDataError, fontFamilyDataLoaded } from 'src/app/store/font-library/actions/font-library.actions';
import { bindCallback, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeadUriLoaderService {

  private readonly fontBaseUrl = 'https://fonts.googleapis.com/css2?family=';
  private readonly fontNameSeparator = '&family=';
  private readonly fontBaseUrlParam = '&display=swap';

  private renderer: Renderer2;

  private scriptLoaded$: Subject<string> = new Subject<string>();

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    private store$: Store<AppState>
  ) {
    // Renderer2 can't be injected (usually used in a Component), so create using factory
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public loadDefaultFonts() {
    // construct the href string for the link element that will be appended to <head>
    let fontLinkUrl = this.fontBaseUrl;
    fontLinkUrl += fonts.map(font => font.hrefId).join(this.fontNameSeparator);
    fontLinkUrl += this.fontBaseUrlParam;

    this.loadFontsLink(fontLinkUrl);
  }

  public loadFont(family: string): Observable<string> {
    //let fontLinkUrl = this.fontBaseUrl + family.replace(' ', '+') + this.fontBaseUrlParam; // TODO: would need to make this regex to replace ALL occurences
    let fontLinkUrl = this.fontBaseUrl + family.split(' ').join('+');

    fontLinkUrl += ':wght@100;200;300;400;500;600;700;800;900';
    // TODO: need to append list of all weights for font to URL so preview pane can display them


    this.loadFontsLink(fontLinkUrl, family);
    return this.scriptLoaded$;
  }

  public loadFontsLink(fontLinkUrl: string, family: string = 'default fonts') {
    // construct the link element to append
    const fontLink: HTMLLinkElement = this.renderer.createElement('link');
    //fontLink.type = 'text/html'; // DO NOT USE THIS - TODO what mime type?
    fontLink.rel = 'stylesheet';
    
    fontLink.onload = this.onloadCallback.bind(this, [family]);
    fontLink.onerror = this.onloadError.bind(this, [family]);

    fontLink.href = fontLinkUrl;

    // append <link> to <head>
    this.attachToHead(fontLink);
  }

  private attachToHead(element: HTMLLinkElement | HTMLScriptElement) {
    const head: HTMLHeadElement = this.document.head || this.document.getElementsByTagName('head')[0];
    head.appendChild(element);
  }

  public onloadCallback(args: string[], $event: Event) {
    const a = args[0];
    this.scriptLoaded$.next(a);
  }

  public onloadError(args: string[]) {
    console.log('!!!!!!!!!!! ERROR LOADING GOOGLE FONT: ', args);
    //debugger;
  }
}
