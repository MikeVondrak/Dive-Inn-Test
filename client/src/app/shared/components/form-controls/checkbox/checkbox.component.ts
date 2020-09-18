import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit, OnChanges {

  @Input() checkboxId: string;
  @Input() title: string;
  @Input() disabled: boolean = true;

  @Output() onOptionChange = new EventEmitter<boolean>();

  public checkedValue: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('@@@@@@ CHECKBOX changes: ' + JSON.stringify(changes,null,4));
  }

  onNgModelChange($event) {
    this.onOptionChange.emit($event);
  }
}
