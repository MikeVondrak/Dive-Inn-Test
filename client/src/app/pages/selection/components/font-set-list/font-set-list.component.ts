import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { AppState } from 'src/app/store/state';
import { FontSet, FontSetListView } from '../../../../models/font-set.model';
import { setActiveFontSetById } from 'src/app/store/active-font-set/actions/active-font-set.actions';
import { deleteFontSet } from 'src/app/store/font-set-library/actions/font-set.actions';

@Component({
  selector: 'app-font-set-list',
  templateUrl: './font-set-list.component.html',
  styleUrls: ['./font-set-list.component.scss']
})
export class FontSetListComponent implements OnInit {

  public loadedFontSetIndex: number = -1;
  public selectedFontSetIndex: number = -1;
  public selectedFontSet: FontSet = undefined;

  @Input() fontSetList: Set<FontSetListView>;

  constructor(private loggerService: LoggerService, private store$: Store<AppState>) {
    this.loggerService.enableLogger(true);
   }

  ngOnInit(): void {

  }

  public fontSetClick(index: number, fontSet: FontSet) {
    this.selectedFontSetIndex = index;
    this.selectedFontSet = fontSet;
  }
  
  public loadFontSet(fontSet: FontSet) {
    this.store$.dispatch(setActiveFontSetById({ fontSetId: fontSet.setId }));
  }

  public removeFontSet(fontSet: FontSet) {
    this.store$.dispatch(deleteFontSet({ fontSetId: fontSet.setId }));
  }
}
