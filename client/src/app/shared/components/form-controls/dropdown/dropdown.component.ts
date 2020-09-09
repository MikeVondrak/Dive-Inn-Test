import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
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
})
export class DropdownComponent implements OnInit, OnChanges {
  
  @Input() htmlId: string = undefined;
  @Input() title: string = '';
  @Input() options$: Observable<DropdownItem[]>;
  @Input() displayProperty?: string;
  @Input() valueProperty?: string;

  @Output() onOptionChange = new EventEmitter<DropdownItem>();

  public selectOptions$: Observable<SelectOption[]>;
  public selectedOption: DropdownItem;

  constructor() { }
  
  ngOnInit(): void {
    // take the options array and check whether it's an object
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    /** @TODO check if options$ input actually changed */
    this.init();
  }

  public optionChange($event: DropdownItem) {
    this.onOptionChange.emit($event);
  }

  /**
   * determine what type was used for options$ input and map to the options array
   */
  private init() {
    this.selectOptions$ = this.options$?.pipe(
      // unwrap observable
      map(options => {
        // if options$ is an observable map create the select options using key/value
        if (options instanceof Map) {
          return Array.from(options).map(option => ({
            uiLabel: option[0] + ' ' + option[1],
            value: option[1]
          }));
        }
        // otherwise options$ should be an observable array of string, number, or object
        const optionObj = options?.[0];
        if (typeof optionObj === 'object') {
          
          // displayProperty and valueProperty must be defined to use an object array to populate the dropdown
          if (this.displayProperty && this.valueProperty) {
            if (Object.keys(optionObj).includes(this.displayProperty) && Object.keys(optionObj).includes(this.valueProperty)) {
              return options.map(option => ({
                uiLabel: option[this.displayProperty],
                value: option
              }));
            } else {
              throw new Error('Option object must include displayProperty: ' + this.displayProperty + ', and valueProperty: ' + this.valueProperty);
            }
          } else {
            throw new Error('Must pass displayProperty and valueProperty inputs to use options$ as object array');
          }
        } else if (options?.length > 0) {
          // is an array of number or string, use option for uiLabel and value
          return options.map(option => ({ uiLabel: option, value: option }));
        } else {
          console.log('DropdownComponent init called with options: ' + options);
        }
      })
    );
  }
}
