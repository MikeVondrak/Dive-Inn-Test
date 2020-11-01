import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
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

  constructor(
    private store$: Store<AppState>,
    private fontInstanceApiService: FontInstanceApiService,
  ) { }

  ngOnInit(): void {

  }

  // public getFontInstances(): Observable<FontInstance[]> {
  //   return this.fontInstanceApiService.getAllFontInstances$();
  // }

  public addFontInstance(newFontInstance: FontInstance): void {
    const afi: Observable<FontInstance> = this.store$.select(getActiveFontInstance);
    const fis: Observable<FontInstance[]> = this.fontInstanceApiService.getAllFontInstances$();
    
    combineLatest([afi, fis]).pipe(
      filter(([activeFontInstance, fontInstances]) => {
        const fontInstanceIsNew = !fontInstances.includes(activeFontInstance);
        return fontInstanceIsNew;
      }),
      map(([afi,]) => afi),
      take(1)
    ).subscribe(activeFontInstance => {
      this.fontInstanceApiService.addFontInstance(activeFontInstance);
    })
  }

}
