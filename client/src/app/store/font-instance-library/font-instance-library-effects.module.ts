import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { FontInstanceLibraryEffects } from './effects';

const DEPENDENCIES = [EffectsModule.forFeature([...FontInstanceLibraryEffects])];

@NgModule({
  declarations: [],
  imports: [
    DEPENDENCIES
  ]
})
export class FontInstanceLibraryEffectsModule { }
