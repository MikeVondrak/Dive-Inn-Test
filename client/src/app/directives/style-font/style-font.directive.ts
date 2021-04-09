import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FontInstance } from 'src/app/models/font-instance.model';
import { UiFont } from 'src/app/models/ui-font.model';

@Directive({
  selector: '[styleFont]'
})
export class StyleFontDirective implements OnInit {

  @Input() fontSource$: Observable<FontInstance>;

  public style: object = {};
  public styleStr = '';

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.fontSource$.subscribe((font: FontInstance) => {
      this.el.nativeElement.innerHTML = font.family;
      // this.loadFontData(font.family);
      this.buildStyleString(font);
      this.el.nativeElement.style.fontFamily = this.style['font-family'];
      this.el.nativeElement.style.fontSize = this.style['font-size'];
      this.el.nativeElement.style.fontWeight = this.style['font-weight'];
      this.el.nativeElement.style.fontStyle = this.style['font-style'];

    })

  }

  public buildStyleString(fontInstance: FontInstance): void {
    this.style = {
      'font-family': fontInstance.family,
      'font-weight': fontInstance.weight,
      'font-style': fontInstance.italic ? "italic" : "normal",
      'font-size' : fontInstance.size + 'px',
    };
    this.styleStr = JSON.stringify(this.style, null, 4);
  }

}
