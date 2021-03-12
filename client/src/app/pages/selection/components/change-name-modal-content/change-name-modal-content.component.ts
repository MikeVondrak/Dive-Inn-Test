import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setNewFontSetName } from 'src/app/store/active-font-set/actions/active-font-set.actions';
import { getActiveFontSetName } from 'src/app/store/active-font-set/selectors/active-font-set.selectors';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-change-name-modal-content',
  templateUrl: './change-name-modal-content.component.html',
  styleUrls: ['./change-name-modal-content.component.scss']
})
export class ChangeNameModalContentComponent implements OnInit {

  public previousName$: Observable<string>;
  public changeFontSetNameForm: FormGroup;
  //public changeFontSetNameInput: FormControl = new FormControl('');

  constructor(private store$: Store<AppState>, private formBuilder: FormBuilder) {
    this.previousName$ = this.store$.select(getActiveFontSetName);
    
  }

  ngOnInit(): void {
    this.previousName$.subscribe(previousName => {
      this.changeFontSetNameForm = this.formBuilder.group({
        // ChangeFontSetName: ['', Validators.required]
        //ChangeFontSetName: new FormControl('', [Validators.required])
        changeFontSetNameInput: [previousName, Validators.required]
      });
    });
    
  }

  public nameChange($event) {
    this.store$.dispatch(setNewFontSetName({ setName: $event.target.value }));
  }

}
