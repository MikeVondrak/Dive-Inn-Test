import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { FontInstance } from 'src/app/models/font-instance.model';
import { FontSet } from 'src/app/models/font-set.model';
import { FontType } from 'src/app/models/font-type.model';
import { getActiveFontSetName } from 'src/app/store/active-font-set/selectors/active-font-set.selectors';
import { AppState } from 'src/app/store/state';
import { FontTypeManagerService } from '../../../../services/font-type-manager/font-type-manager.service';

@Component({
  selector: 'app-font-set-selector',
  templateUrl: './font-set-selector.component.html',
  styleUrls: ['./font-set-selector.component.scss']
})
export class FontSetSelectorComponent implements OnInit {

  public allFontTypes$: Observable<FontType[]> = this.fontTypeManagerService.getAllFontTypes$();

  //public activeFontSet$: Observable<FontSet> = this.store$.select(getActiveFontSet);
  public activeFontSet$: Observable<string> = this.store$.select(getActiveFontSetName);

  constructor(
    private store$: Store<AppState>,
    private fontTypeManagerService: FontTypeManagerService
  ) { 
    //this.activeFontSet$ = this.store$.select<string>(getActiveFontSetName);
  }

  ngOnInit(): void {
    
  }

}
