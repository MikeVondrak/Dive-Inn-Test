import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { FontInstance } from 'src/app/models/font-instance.model';
import { FontSet } from 'src/app/models/font-set.model';
import { FontType, FontTypeInstanceKvp } from 'src/app/models/font-type.model';
import { FontInstanceManagerService } from 'src/app/services/font-instance-manager/font-instance-manager.service';
import { FontSetManagerService } from 'src/app/services/font-set-manager/font-set-manager.service';
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
  public activeFontSetTypeInstanceIds$: Observable<[string, number][]> = this.store$.select(getActiveFontSetTypeInstances);
  public allFontInstances$: Observable<FontInstance[]> = this.fontInstanceManagerService.getAllFontInstances$();
  
  
  public activeFontSet$: Observable<FontSet> = this.store$.select(getActiveFontSet);
  public activeFontSetName$: Observable<string> = this.store$.select(getActiveFontSetName);
  public activeFontSetFontInstances$: Observable<FontTypeInstanceKvp[]> = this.store$.select(getActiveFontSetFontInstances);

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

  public storeActiveFontInstanceToSet(fontTypeInstanceKvp: FontTypeInstanceKvp) {
    const ftiKvp = {...fontTypeInstanceKvp};
    this.store$.select(getActiveFontInstance).pipe(take(1)).subscribe(afi => {
      ftiKvp.value = Object.assign({}, afi);
      this.store$.dispatch(setActiveFontSetFontInstance({fontTypeInstanceKvp: ftiKvp}));
    });
  }

  public saveActiveFontSet() {
    // get the activeFontSet from store?
    //  dispatch action that updates (get active font set from store state) ?
    const afi: FontSet = this.activeFontSet$;

    this.fontSetManagerService.updateFontSet$(afi);
  }

  public createFontSet() {
    // MODALS
  }

  public updateFontSetName() {
    // use value from Font Set Name control
  }

}
