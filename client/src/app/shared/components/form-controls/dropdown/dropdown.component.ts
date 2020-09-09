import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type DropdownItem = string | number | object;
interface SelectOption {
  uiLabel: string;
  value: DropdownItem
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent implements OnInit, OnChanges {
  
  @Input() htmlId: string = undefined;
  @Input() title: string = '';
  @Input() options$: Observable<DropdownItem[]>;
  //@Input() options: DropdownItem[];
  @Input() displayProperty?: string;
  @Input() valueProperty?: string;

  //@Input() selectedOption: DropdownItem;
  //@Output() selectedOptionChange = new EventEmitter<DropdownItem>();
  @Output() onOptionChange = new EventEmitter<DropdownItem>();

  public selectOptions$: Observable<SelectOption[]>;

  public selectedOption: DropdownItem;

  constructor(private cdr: ChangeDetectorRef) { }
  
  ngOnInit(): void {
    // take the options array and check whether it's an object
    console.log('DROPDOWN ONINIT');
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.init();
  }

  public optionChange($event: DropdownItem) {
    //debugger;
    this.onOptionChange.emit($event);
    setTimeout(() => { 
      console.log('******** TIMEOUT ELAPSED');
      this.detectChanges(); 
    }, 5000);
  }

  public detectChanges() {
    console.log('******** CHECKING CHANGES IN DROPDOWN');
    this.cdr.detectChanges();
  }

  private init() {
    this.selectOptions$ = this.options$?.pipe(
      map(optionsArray => {
        //debugger;
        if (optionsArray instanceof Map) {
          console.log('++++++++++++ DROPDOWN OPTIONSARRAY IS ARAY OF MAP');
          return Array.from(optionsArray).map(option => ({
            uiLabel: option[0] + ' ' + option[1],
            value: option[1]
          }));
        }
        const optionObj = optionsArray?.[0];
        console.log('\n\nDROPDOWN options$ map - optionObj: ' + optionObj + ', type: ' + typeof optionObj);
        if (typeof optionObj === 'object') {
          console.log('DROPDOWN ONINIT -----its an object');
          
          if (this.displayProperty && this.valueProperty) {
            if (Object.keys(optionObj).includes(this.displayProperty) && Object.keys(optionObj).includes(this.valueProperty)) {
              return optionsArray.map(option => ({
                uiLabel: option[this.displayProperty],
                value: option //option[this.valueProperty]
              }));
            } else {
              throw new Error('Option object must include displayProperty: ' + this.displayProperty + ', and valueProperty: ' + this.valueProperty);
            }
          } else {
            throw new Error('Must pass displayProperty and valueProperty inputs to use options$ as object array');
          }
        } else if (optionsArray?.length > 0) {
          // not an object array, is an array of number or string, use option for uiLabel and value
          return optionsArray.map(option => ({ uiLabel: option, value: option }));
        } else {
          // do nothing?
        }
      })
    );
  }
}
