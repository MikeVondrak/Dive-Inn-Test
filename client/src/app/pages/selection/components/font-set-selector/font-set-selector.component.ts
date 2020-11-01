import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { FontInstance } from 'src/app/models/font-instance.model';
import { getActiveFontInstance } from 'src/app/store/active-font-instance/selectors/active-font-instance.selectors';
import { AppState } from 'src/app/store/state';
import { FontInstanceApiService } from '../../../../services/api/font-instance/font-instance.api.service';

@Component({
  selector: 'app-font-set-selector',
  templateUrl: './font-set-selector.component.html',
  styleUrls: ['./font-set-selector.component.scss']
})
export class FontSetSelectorComponent implements OnInit {

  public allFontInstances$: Observable<FontInstance[]> = this.fontInstanceApiService.getAllFontInstances$();
  private afiSub: Subscription = undefined;

  constructor(
    private store$: Store<AppState>,
    private fontInstanceApiService: FontInstanceApiService,
  ) { 
    debugger;
    if (!this.afiSub) {
      this.addActiveFontInstance();
    }
  }

  ngOnInit(): void {
    
  }

  public addActiveFontInstance(): void {
    const afi: Observable<FontInstance> = this.store$.select(getActiveFontInstance);
    const fis: Observable<FontInstance[]> = this.fontInstanceApiService.getAllFontInstances$();
    debugger;
    this.afiSub = combineLatest([afi, fis]).pipe(
      filter(([activeFontInstance, fontInstances]) => {
        const fontInstanceIsNew = fontInstances.find(fi => 
          fi.family === activeFontInstance.family && 
          fi.weight === activeFontInstance.weight && 
          fi.size === activeFontInstance.size && 
          fi.italic === activeFontInstance.italic);
        return !fontInstanceIsNew;
      }),
      map(([afi,]) => afi),
    ).subscribe(activeFontInstance => {
      debugger;
      this.fontInstanceApiService.addFontInstance(activeFontInstance).subscribe();
    })
  }

}
