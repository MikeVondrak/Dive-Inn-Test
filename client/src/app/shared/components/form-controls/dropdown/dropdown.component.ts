import { Component, OnInit, Input } from '@angular/core';

type DropdownItem = string | number | object;
interface SelectOption {
  uiLabel: string;
  value: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  
  @Input() options: DropdownItem[] = [];
  @Input() displayProperty?: string;
  @Input() valueProperty?: string;

  public selectOptions: SelectOption[];

  constructor() { }


  ngOnInit(): void {
    // take the options array and check whether it's an object
    let str = 'string';
    let num = 101;
    let obj = { prop: 'value' };

    console.log('************ str: ' + typeof str + ', num: ' + typeof num + ', obj: ' + typeof obj);

    const optionObj = this.options[0];
    
    if (typeof optionObj === 'object') {
      if (this.displayProperty && this.valueProperty) {
        if (Object.keys(optionObj).includes(this.displayProperty) && Object.keys(optionObj).includes(this.valueProperty)) {
          this.selectOptions = this.options.map(option => {
            let selectOption: SelectOption;
            selectOption.uiLabel = option['displayProperty'];
            selectOption.value = option['valueProperty'];            
            return selectOption;
          });
        }
      }
    }
    // if it is an object
    //    check that displayProperty and valueProperty were passed (or just pass one?)
    //      if not -> fail?
    //    if displayProperty and valueProperty exist on the options array object
    //      map options into selectOptions with display and value
    //    else
    //      map options into selectOptions using option as both values
  }

}
