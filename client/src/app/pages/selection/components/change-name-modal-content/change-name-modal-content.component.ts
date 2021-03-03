import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setNewFontSetName } from 'src/app/store/active-font-set/actions/active-font-set.actions';
import { getActiveFontSetName } from 'src/app/store/active-font-set/selectors/active-font-set.selectors';

@Component({
  selector: 'app-change-name-modal-content',
  templateUrl: './change-name-modal-content.component.html',
  styleUrls: ['./change-name-modal-content.component.scss']
})
export class ChangeNameModalContentComponent implements OnInit {

  public previousName$: Observable<string>;

  constructor(private store$: Store) {
    this.previousName$ = this.store$.select(getActiveFontSetName);
    debugger;
  }

  ngOnInit(): void {
  }

  public nameChange($event) {
    this.store$.dispatch(setNewFontSetName({ setName: $event.target.value }));
  }

}
