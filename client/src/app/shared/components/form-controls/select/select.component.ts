import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take, tap, withLatestFrom } from 'rxjs/operators';
import { FontSet, FontSetListView } from 'src/app/models/font-set.model';
import { FontSetApiMapped } from 'src/app/services/api/font-set/font-set.api.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() htmlName: string = 'FontSetSelect';
  @Input() fontSetList$: Observable<FontSetListView[]>;
  @Input() activeFontSetId$: Observable<string>;
  @Input() activeFontSet: FontSetApiMapped;

  @Output() onOptionSelected = new EventEmitter<FontSetListView>();

  public selectedSet: FontSetListView = null;

  constructor() { }

  ngOnInit(): void {
    if (!!this.activeFontSet && this.activeFontSet.set_id) {
      this.selectedSet = {
        name: this.activeFontSet.set_name,
        setId: this.activeFontSet.set_id
      };
    }
    
    // this.fontSetList$.pipe(
    //   take(1),
    //   withLatestFrom(this.activeFontSetId$),
    //   tap(([fontSetList, activeFontSetId]) => {
    //     this.selectedSet.setId = activeFontSetId;
    //   })
    // )
    // this.activeFontSetId$.pipe(take(1)).subscribe(activeFontSetId => {
    //   // change selectedSet ID / name to active font set
    // })
  }

  public optionSelected(selectedFontSet: FontSetListView) {
    this.selectedSet = selectedFontSet;
    this.onOptionSelected.emit(selectedFontSet);
  }

  public compareFn(opt1: FontSetListView, opt2: FontSetListView) {
    return opt1 && opt2 ? opt1.setId === opt2.setId : opt1 === opt2;
  }
}


