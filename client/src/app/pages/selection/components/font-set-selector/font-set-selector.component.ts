import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { FontInstance } from 'src/app/models/font-instance.model';
import { FontSet } from 'src/app/models/font-set.model';
import { FontType } from 'src/app/models/font-type.model';
import { getActiveFontSetName, getActiveFontSetTypeInstanceMap } from 'src/app/store/active-font-set/selectors/active-font-set.selectors';
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
  private activeFontSetTypeInstanceIdMap$: Observable<Map<string, number>> = this.store$.select(getActiveFontSetTypeInstanceMap);

  public activeFontSetFontInstances$: Observable<FontInstance[]> = this.activeFontSetTypeInstanceIdMap$.pipe(
    map(typeInstanceMap => {
      Array.from(typeInstanceMap).map(keyValuePair => {
        // check if FontInstance exists in the FE list
        //  if so return the FontInstance from FE list

        // if not, send the API request to add the FontInstance
        // fire the action to indicate FontInstance is ready
      })
    })
  )

  constructor(
    private store$: Store<AppState>,
    private fontTypeManagerService: FontTypeManagerService
  ) { 
    //this.activeFontSet$ = this.store$.select<string>(getActiveFontSetName);
  }

  ngOnInit(): void {
    
  }

}
