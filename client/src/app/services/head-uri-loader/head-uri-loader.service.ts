import { Injectable, Renderer2, Inject, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { fonts } from './head-uri-loader.model';

@Injectable({
  providedIn: 'root'
})
export class HeadUriLoaderService {

  private readonly fontBaseUrl = 'https://fonts.googleapis.com/css2?family=';
  private readonly fontNameSeparator = '&family=';
  private readonly fontBaseUrlParam = '&display=swap';

  private fontLinkUrl: string;
  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    // Renderer2 can't be injected (usually used in a Component), so create using factory
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public loadFontsLink() {
    // construct the href string for the link element that will be appended to <head>
    this.fontLinkUrl = this.fontBaseUrl;
    this.fontLinkUrl += fonts.map(font => font.hrefId).join(this.fontNameSeparator);
    this.fontLinkUrl += this.fontBaseUrlParam;
    console.log('** fontLinkUrl: ' + this.fontLinkUrl);

    // construct the link element to append
    const fontLink: HTMLLinkElement = this.renderer.createElement('link');
    fontLink.type = 'text/css';
    fontLink.rel = 'stylesheet';
    fontLink.href = this.fontLinkUrl;
    fontLink.onload = this.onloadCallback.bind(this, ['fontLink']);
    fontLink.onerror = this.onloadCallback.bind(this, ['fontLink Error']);

    // append <link> to <head>
    this.attachToHead(fontLink);
  }

  private attachToHead(element: HTMLLinkElement | HTMLScriptElement) {
    const head: HTMLHeadElement = this.document.head || this.document.getElementsByTagName('head')[0];
    head.appendChild(element);
  }

  public onloadCallback(args: string[]) {
    console.log('** onloadCallback: ' + args[0]);
  }
}
