import { Component, OnInit, Type } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { FontInstance } from 'src/app/models/font-instance.model';
import { FontSet } from 'src/app/models/font-set.model';
import { FontType, FontTypeInstanceKvp, FontTypeInstanceMap, FontTypeInstancePair } from 'src/app/models/font-type.model';
import { FontSetApiMapped } from 'src/app/services/api/font-set/font-set.api.model';
import { FontInstanceManagerService } from 'src/app/services/font-instance-manager/font-instance-manager.service';
import { FontSetManagerService } from 'src/app/services/font-set-manager/font-set-manager.service';
import { setActiveFontInstance } from 'src/app/store/active-font-instance/actions/active-font-instance.actions';
import { getActiveFontInstance } from 'src/app/store/active-font-instance/selectors/active-font-instance.selectors';
import { changeActiveFontSetName, createNewFontSet, saveActiveFontSet, setActiveFontSetFontInstance } from 'src/app/store/active-font-set/actions/active-font-set.actions';
import { openModal } from 'src/app/store/modal/actions/modal.actions';
import { getActiveFontSetName } from 'src/app/store/active-font-set/selectors/active-font-set.selectors';
import { getUiActiveFontSetTypeInstances, getUiFontInstances } from 'src/app/store/app.selectors';
import { getFontSetApisMapped } from 'src/app/store/font-set-library/selectors/font-set-library.selectors';
import { AppState } from 'src/app/store/state';
import { FontTypeManagerService } from '../../../../services/font-type-manager/font-type-manager.service';
import { NewSetNameModalContentComponent } from '../new-set-name-modal-content/new-set-name-modal-content.component';
import { ModalService } from '../../../../services/modal/modal.service';
import { ChangeNameModalContentComponent } from '../change-name-modal-content/change-name-modal-content.component';
import { ModalConfig } from 'src/app/models/modal.model';


@Component({
  selector: 'app-font-set-selector',
  templateUrl: './font-set-selector.component.html',
  styleUrls: ['./font-set-selector.component.scss']
})
export class FontSetSelectorComponent implements OnInit {

  
  public allFontTypes$: Observable<FontType[]> = this.fontTypeManagerService.allFontTypes$;
  
  public uiFontInstances$: Observable<FontInstance[]> = this.store$.select(getUiFontInstances);
  public allFontSets$: Observable<FontSetApiMapped[]> = this.store$.select(getFontSetApisMapped);
  
  
  public activeFontSetName$: Observable<string>;// = this.store$.select(getActiveFontSetName);
  public activeFontSetTypeInstances$: Observable<FontTypeInstanceMap> = this.store$.select(getUiActiveFontSetTypeInstances);

  public readyToChangeName: boolean = false;
  public readyToSave: boolean = true; // SAVE button is not shown until a font let has been loaded into the Font Set Selector, safe to just leave it enabled

  constructor(
    private store$: Store<AppState>,
    private fontTypeManagerService: FontTypeManagerService,
    private fontInstanceManagerService: FontInstanceManagerService,
    private fontSetManagerService: FontSetManagerService,
    private modalService: ModalService
  ) {
    this.activeFontSetName$ = this.store$.select(getActiveFontSetName);
  }

  ngOnInit(): void {}

  public setActiveFontInstance(fontTypeInstanceKvp: FontTypeInstanceKvp) {
    this.store$.dispatch(setActiveFontInstance({fontInstance: fontTypeInstanceKvp.value}));
  }

  public storeActiveFontInstanceToSet(fontType: FontType) {
    this.store$.dispatch(setActiveFontSetFontInstance({fontType: fontType}));
  }

  public saveActiveFontSet() {
    this.store$.dispatch(saveActiveFontSet());
  }

  public openModal() {
    const config: ModalConfig = {
      title: 'Create a new set',
      contentType: NewSetNameModalContentComponent as Type<Component>,
      primaryAction: createNewFontSet(),
    }
    this.modalService.open(config);
  }

  public updateFontSetName() {
    const config: ModalConfig = {
      title: 'Change font set name',
      contentType: ChangeNameModalContentComponent as Type<Component>,
      primaryAction: changeActiveFontSetName(),
    }
    this.modalService.open(config);
  }

  public sortOriginalOrder(a, b): number {
    return 0;
  }

}
