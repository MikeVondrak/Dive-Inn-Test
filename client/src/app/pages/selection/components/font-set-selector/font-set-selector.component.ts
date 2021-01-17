import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { FontInstance } from 'src/app/models/font-instance.model';
import { FontSet } from 'src/app/models/font-set.model';
import { FontType, FontTypeInstanceKvp, FontTypeInstanceMap, FontTypeInstancePair } from 'src/app/models/font-type.model';
import { FontInstanceManagerService } from 'src/app/services/font-instance-manager/font-instance-manager.service';
import { FontSetManagerService } from 'src/app/services/font-set-manager/font-set-manager.service';
import { setActiveFontInstance } from 'src/app/store/active-font-instance/actions/active-font-instance.actions';
import { getActiveFontInstance } from 'src/app/store/active-font-instance/selectors/active-font-instance.selectors';
import { setActiveFontSetFontInstance } from 'src/app/store/active-font-set/actions/active-font-set.actions';
import { getActiveFontSetName } from 'src/app/store/active-font-set/selectors/active-font-set.selectors';
import { getUiActiveFontSetTypeInstances, getUiFontInstances } from 'src/app/store/app.selectors';
import { AppState } from 'src/app/store/state';
import { FontTypeManagerService } from '../../../../services/font-type-manager/font-type-manager.service';

@Component({
  selector: 'app-font-set-selector',
  templateUrl: './font-set-selector.component.html',
  styleUrls: ['./font-set-selector.component.scss']
})
export class FontSetSelectorComponent implements OnInit {

  
  public allFontTypes$: Observable<FontType[]> = this.fontTypeManagerService.allFontTypes$;
  public activeFontSetTypeInstanceIds$: Observable<[string, number][]> = of([]); // this.store$.select(getActiveFontSetTypeInstances);
  public uiFontInstances$: Observable<FontInstance[]> = this.store$.select(getUiFontInstances);
  
  
  //public activeFontSet$: Observable<FontSet> = this.store$.select(getActiveFontSet);
  public activeFontSetName$: Observable<string> = this.store$.select(getActiveFontSetName);
  public activeFontSetTypeInstances$: Observable<FontTypeInstanceMap> = this.store$.select(getUiActiveFontSetTypeInstances);

  constructor(
    private store$: Store<AppState>,
    private fontTypeManagerService: FontTypeManagerService,
    private fontInstanceManagerService: FontInstanceManagerService,
    private fontSetManagerService: FontSetManagerService
  ) {}

  ngOnInit(): void {}

  public setActiveFontInstance(fontTypeInstanceKvp: FontTypeInstanceKvp) {
    this.store$.dispatch(setActiveFontInstance({fontInstance: fontTypeInstanceKvp.value}));
  }

  public storeActiveFontInstanceToSet(fontType: FontType) {
    this.store$.dispatch(setActiveFontSetFontInstance({fontType: fontType}));
  }

  public saveActiveFontSet() {
    // dispatch action that updates (get active font set from store state) ?
    //this.store$.dispatch();

    //this.fontSetManagerService.updateFontSet$(afi);
  }

  public createFontSet() {
    // MODALS
  }

  public updateFontSetName() {
    // use value from Font Set Name control
  }

  public sortOriginalOrder(a, b): number {
    return 0;
  }

}
