import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { FontInstance } from 'src/app/models/font-instance.model';
import { FontSet } from 'src/app/models/font-set.model';
import { FontType, FontTypeInstanceKvp } from 'src/app/models/font-type.model';
import { FontInstanceManagerService } from 'src/app/services/font-instance-manager/font-instance-manager.service';
import { getActiveFontSetFontInstances, getActiveFontSetName, getActiveFontSetTypeInstances } from 'src/app/store/active-font-set/selectors/active-font-set.selectors';
import { AppState } from 'src/app/store/state';
import { FontTypeManagerService } from '../../../../services/font-type-manager/font-type-manager.service';

@Component({
  selector: 'app-font-set-selector',
  templateUrl: './font-set-selector.component.html',
  styleUrls: ['./font-set-selector.component.scss']
})
export class FontSetSelectorComponent implements OnInit {

  
  public allFontTypes$: Observable<FontType[]> = this.fontTypeManagerService.getAllFontTypes$();
  public activeFontSetName$: Observable<string> = this.store$.select(getActiveFontSetName);
  public activeFontSetTypeInstanceIds$: Observable<[string, number][]> = this.store$.select(getActiveFontSetTypeInstances);
  public allFontInstances$: Observable<FontInstance[]> = this.fontInstanceManagerService.getAllFontInstances$();
  
  

  public activeFontSetFontInstances$: Observable<FontTypeInstanceKvp[]> = this.store$.select(getActiveFontSetFontInstances);

  constructor(
    private store$: Store<AppState>,
    private fontTypeManagerService: FontTypeManagerService,
    private fontInstanceManagerService: FontInstanceManagerService
  ) {}

  ngOnInit(): void {}

}
