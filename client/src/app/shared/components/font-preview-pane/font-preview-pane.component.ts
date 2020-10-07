import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { FontInstance } from 'src/app/models/font-instance.model';
import { AppState } from 'src/app/store/state';

import {
  //getFontInstance, 
  getActiveFontFamily,
} from 'src/app/store/active-font-instance/selectors/active-font-instance.selectors';
import { Observable } from 'rxjs';
import { ActiveFontInstanceState } from 'src/app/store/active-font-instance/active-font-instance.state';

@Component({
  selector: 'app-font-preview-pane',
  templateUrl: './font-preview-pane.component.html',
  styleUrls: ['./font-preview-pane.component.scss']
})
export class FontPreviewPaneComponent implements OnInit, OnChanges {

  @Input() fontInstance: FontInstance;
  @Input() previewText: string = 'The quick brown fox jumped over the lazy dog.!?#@()&%+='

  public style: object = {};

  public styleStr = '';
  public storeFontInstance$: Observable<FontInstance>;
  public storeFontFamily$: Observable<string>;
  public a$;
  public b$;

  constructor(private store$: Store<AppState>) { }
  //constructor(private store$: Store<ActiveFontInstanceState>) { }

  ngOnInit(): void {
    // this.storeFontInstance$ = this.store$.select(getFontInstance);
    this.storeFontFamily$ = this.store$.select(getActiveFontFamily);
    // this.a$ = this.store$.select(fontInstance);
    //this.b$ = this.store$.select('rootStore');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // check if the fontInstance input changed
    const keyNames = Object.keys(changes);
    if (keyNames.includes('fontInstance')) {
      // rebuild the style string whenever fontInstance changes
      this.buildStyleString();
    }
  }

  public buildStyleString(): void {
    this.style = {
      'font-family': 'sans-serif', //this.fontInstance.family,
      'font-weight': this.fontInstance.weight,
      'font-style': this.fontInstance.italic ? "italic" : "normal",
      'font-size' : this.fontInstance.size + 'px',
    };
    this.styleStr = JSON.stringify(this.style, null, 4);
  }

}
