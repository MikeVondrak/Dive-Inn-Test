import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { FontInstance } from 'src/app/models/font-instance.model';
import { FontType } from 'src/app/models/font-type.model';
import { getActiveFontInstance } from 'src/app/store/active-font-instance/selectors/active-font-instance.selectors';
import { AppState } from 'src/app/store/state';
import { FontTypeManagerService } from '../../../../services/font-type-manager/font-type-manager.service';

@Component({
  selector: 'app-font-set-selector',
  templateUrl: './font-set-selector.component.html',
  styleUrls: ['./font-set-selector.component.scss']
})
export class FontSetSelectorComponent implements OnInit {

  public allFontTypes$: Observable<FontType[]> = this.fontTypeManagerService.getAllFontTypes$();

  constructor(
    private store$: Store<AppState>,
    private fontTypeManagerService: FontTypeManagerService
  ) { 
    
  }

  ngOnInit(): void {
    
  }

}
