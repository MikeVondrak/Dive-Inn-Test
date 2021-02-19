import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setNewFontSetName } from 'src/app/store/active-font-set/actions/active-font-set.actions';

@Component({
  selector: 'app-new-set-name-modal-content',
  templateUrl: './new-set-name-modal-content.component.html',
  styleUrls: ['./new-set-name-modal-content.component.scss']
})
export class NewSetNameModalContentComponent implements OnInit {

  constructor(private store$: Store) { }

  ngOnInit(): void {
  }

  // create an effect for createNewFontSet
  //   -> pulls newFontSetName
  //   -> creates set of controls with "default" font in them
  //  ? update db when modal OK is clicked or after user clicks the SAVE button

  public nameChange($event) {
    this.store$.dispatch(setNewFontSetName({ setName: $event.target.value }));
  }
}
