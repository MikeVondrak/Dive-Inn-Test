import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { FontWeightEffects } from './';

const DEPENDENCIES = [EffectsModule.forFeature([...FontWeightEffects])];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DEPENDENCIES
  ]
})
export class FontWeightEffectsModule { }
