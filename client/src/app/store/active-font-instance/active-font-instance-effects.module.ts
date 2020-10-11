import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { ActiveFontInstanceEffects } from './effects';

const DEPENDENCIES = [EffectsModule.forFeature([...ActiveFontInstanceEffects])];

@NgModule({
  declarations: [],
  imports: [
    DEPENDENCIES
  ]
})
export class ActiveFontInstanceEffectsModule { }
