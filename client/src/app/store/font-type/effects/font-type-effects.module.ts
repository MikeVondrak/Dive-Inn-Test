import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { FontTypesEffects } from './';

const DEPENDENCIES = [EffectsModule.forFeature([...FontTypesEffects])];

@NgModule({
  declarations: [],
  imports: [
    DEPENDENCIES
  ]
})
export class FontTypeEffectsModule { }
