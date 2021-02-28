import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setNewFontSetName } from 'src/app/store/active-font-set/actions/active-font-set.actions';

@Component({
  selector: 'app-change-name-modal-content',
  templateUrl: './change-name-modal-content.component.html',
  styleUrls: ['./change-name-modal-content.component.scss']
})
export class ChangeNameModalContentComponent implements OnInit {

  constructor(private store$: Store) { }

  ngOnInit(): void {
  }

  public nameChange($event) {
    this.store$.dispatch(setNewFontSetName({ setName: $event.target.value }));
  }

}
