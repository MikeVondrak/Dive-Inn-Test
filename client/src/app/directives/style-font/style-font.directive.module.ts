import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleFontDirective } from './style-font.directive';

@NgModule({
  declarations: [
    StyleFontDirective
  ],
  imports: [
    CommonModule,
  ],
  providers: [],
  exports: [
    StyleFontDirective
  ]
})
export class StyleFontDirectiveModule { }
