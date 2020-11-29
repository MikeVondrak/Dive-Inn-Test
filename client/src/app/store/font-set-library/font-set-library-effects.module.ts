import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { FontSetLibraryEffects } from './effects';

const DEPENDENCIES = [EffectsModule.forFeature([...FontSetLibraryEffects])];

@NgModule({
  declarations: [],
  imports: [
    DEPENDENCIES
  ]
})
export class FontSetLibraryEffectsModule { }
