import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { FontInstance } from 'src/app/models/font-instance.model';
import { FontSet } from 'src/app/models/font-set.model';
import { FontType, FontTypeInstanceKvp } from 'src/app/models/font-type.model';
import { FontInstanceManagerService } from 'src/app/services/font-instance-manager/font-instance-manager.service';
import { setActiveFontInstance } from 'src/app/store/active-font-instance/actions/active-font-instance.actions';
import { getActiveFontInstance } from 'src/app/store/active-font-instance/selectors/active-font-instance.selectors';
import { setActiveFontSetFontInstance } from 'src/app/store/active-font-set/actions/active-font-set.actions';
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

  public setActiveFontInstance(fontTypeInstanceKvp: FontTypeInstanceKvp) {
    this.store$.dispatch(setActiveFontInstance({fontInstance: fontTypeInstanceKvp.value}));
  }

  public storeActiveFontInstanceToSet(fontTypeInstanceKvp: FontTypeInstanceKvp) {
    // what steps need to happen, in english?
    // save activeFontInstance to activeFontSet
    //  dispatch existing fontType instance of the activeFontSet in the store
    this.store$.select(getActiveFontInstance).pipe(take(1)).subscribe(afi => {
      fontTypeInstanceKvp.value = afi;
      this.store$.dispatch(setActiveFontSetFontInstance({fontTypeInstanceKvp: fontTypeInstanceKvp}));
    });
  }

}
