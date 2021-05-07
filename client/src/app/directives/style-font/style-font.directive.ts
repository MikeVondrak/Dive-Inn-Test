import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { Observable } from 'rxjs';
import { filter, tap, withLatestFrom } from 'rxjs/operators';
import { FontInstance } from 'src/app/models/font-instance.model';
import { UiFont } from 'src/app/models/ui-font.model';
import { loadFontFamilyData } from 'src/app/store/font-library/actions/font-library.actions';
import { getFontDataLoaded } from 'src/app/store/font-library/selectors/font-library.selectors';

@Directive({
  selector: '[styleFont]'
})
export class StyleFontDirective implements OnInit {

  @Input() fontSource$: Observable<FontInstance>;

  public style: object = {};
  public styleStr = '';

  constructor(private el: ElementRef, private store$: Store<AppState>) { }

  ngOnInit() {
    this.fontSource$.pipe(
      tap((fontSource: FontInstance) => this.store$.dispatch(loadFontFamilyData({ family: fontSource.family }))),
      withLatestFrom(this.store$.select(getFontDataLoaded).pipe(filter(loaded => !!loaded)))
    )
    .subscribe(([font, loaded]) => {
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
function fontDataLoaded(fontDataLoaded: any) {
  throw new Error('Function not implemented.');
}

