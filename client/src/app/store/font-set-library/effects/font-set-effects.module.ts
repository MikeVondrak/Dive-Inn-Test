import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { FontSetLibraryEffects } from './';

const DEPENDENCIES = [EffectsModule.forFeature([...FontSetLibraryEffects])];

@NgModule({
  declarations: [],
  imports: [
    DEPENDENCIES
  ]
})
export class FontSetEffectsModule { }
