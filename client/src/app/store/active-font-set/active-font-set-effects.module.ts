import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { ActiveFontSetEffects } from './effects';

const DEPENDENCIES = [EffectsModule.forFeature([...ActiveFontSetEffects])];

@NgModule({
  declarations: [],
  imports: [
    DEPENDENCIES
  ]
})
export class ActiveFontSetEffectsModule { }
