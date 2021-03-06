import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { FontInstance } from 'src/app/models/font-instance.model';
import { LoadingDirective } from 'src/app/directives/loading/loading.directive';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { loadFontFamilyData } from 'src/app/store/font-library/actions/font-library.actions';
import { FontPreviewDisplayStylesEnum } from 'src/app/models/font-preview-pane.model';

@Component({
  selector: 'app-font-preview-pane',
  templateUrl: './font-preview-pane.component.html',
  styleUrls: ['./font-preview-pane.component.scss']
})
export class FontPreviewPaneComponent implements OnInit, OnChanges {

  @Input() fontInstance: FontInstance;
  @Input() previewText: string = 'The quick brown fox jumped over the lazy dog.!?#@()&%+=';
  
  @Input() displayStyle: FontPreviewDisplayStylesEnum = FontPreviewDisplayStylesEnum.DEFAULT;

  public style: object = {};
  public styleStr = '';

  // enum template accessor
  public DisplayStylesEnum = FontPreviewDisplayStylesEnum;
  
  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {
    this.buildStyleString();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // check if the fontInstance input changed
    const keyNames = Object.keys(changes);
    if (keyNames.includes('fontInstance')) {
      if (!!this.fontInstance.family) {
        // make sure the font to be displayed has been downloaded
        setTimeout(() => {
          this.loadFontData(this.fontInstance.family);
        });
        
        // rebuild the style string whenever fontInstance changes
        this.buildStyleString();
      }
    }
  }

  public buildStyleString(): void {
    this.style = {
      'font-family': this.fontInstance.family,
      'font-weight': this.fontInstance.weight,
      'font-style': this.fontInstance.italic ? "italic" : "normal",
      'font-size' : this.fontInstance.size + 'px',
    };
    this.styleStr = JSON.stringify(this.style, null, 4);
    // console.log('!!+!+!+!+!! buildStyleString weight: ' + this.style['font-weight'] + '\n\n' + this.styleStr);
  }

  private loadFontData(family: string) {
    this.store$.dispatch(loadFontFamilyData({ family }));
  }
}
