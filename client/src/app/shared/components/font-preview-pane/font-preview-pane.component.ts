import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { FontInstance } from 'src/app/models/font-instance.model';
import { LoadingDirective } from 'src/app/directives/loading.directive';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { loadFontFamilyData } from 'src/app/store/font-library/actions/font-library.actions';

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
  
  constructor(private store$: Store<AppState>) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // check if the fontInstance input changed
    const keyNames = Object.keys(changes);
    if (keyNames.includes('fontInstance')) {
      if (!!this.fontInstance.family) {
        // make sure the font to be displayed has been downloaded
        this.loadFontData(this.fontInstance.family);
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
  }

  private loadFontData(family: string) {
    // TODO: need to check if font has already been loaded (FontLibrary state)
    this.store$.dispatch(loadFontFamilyData({ family }));
  }
}
