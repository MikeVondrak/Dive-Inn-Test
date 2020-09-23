import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DropdownComponent } from './dropdown/dropdown.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { TextboxComponent } from './textbox/textbox.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    DropdownComponent,
    CheckboxComponent,
    TextboxComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [],
  exports: [
    DropdownComponent,
    CheckboxComponent,
    TextboxComponent,
    ButtonComponent,
  ],
})
export class FormControlsModule { }
