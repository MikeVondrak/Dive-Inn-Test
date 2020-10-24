import { Injectable, Renderer2, Inject, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { fonts } from './head-uri-loader.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { fontFamilyDataError, fontFamilyDataLoaded } from 'src/app/store/font-library/actions/font-library.actions';

@Injectable({
  providedIn: 'root'
})
export class HeadUriLoaderService {

  private readonly fontBaseUrl = 'https://fonts.googleapis.com/css2?family=';
  private readonly fontNameSeparator = '&family=';
  private readonly fontBaseUrlParam = '&display=swap';

  private renderer: Renderer2;

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
    fontLinkUrl = fonts.map(font => font.hrefId).join(this.fontNameSeparator);
    fontLinkUrl += this.fontBaseUrlParam;

    this.loadFontsLink(fontLinkUrl);
  }

  public loadFont(family: string) {
    let fontLinkUrl = this.fontBaseUrl + family.replace(' ', '+') + this.fontBaseUrlParam;
    this.loadFontsLink(fontLinkUrl);
  }

  public loadFontsLink(fontLinkUrl: string, family: string = 'default fonts') {
    // construct the link element to append
    const fontLink: HTMLLinkElement = this.renderer.createElement('link');
    fontLink.type = 'text/html';
    fontLink.rel = 'stylesheet';
    fontLink.href = fontLinkUrl;
    fontLink.onload = this.onloadCallback.bind(this, [family]);
    fontLink.onerror = this.onloadError.bind(this, [family]);

    // append <link> to <head>
    this.attachToHead(fontLink);
  }

  private attachToHead(element: HTMLLinkElement | HTMLScriptElement) {
    const head: HTMLHeadElement = this.document.head || this.document.getElementsByTagName('head')[0];
    head.appendChild(element);
  }

  public onloadCallback(args: string[]) {
    this.store$.dispatch(fontFamilyDataLoaded({ family: args[0] }));
  }

  public onloadError(args: string[]) {
    this.store$.dispatch(fontFamilyDataError({ family: args[0] }));
  }
}
