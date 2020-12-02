import { NgModule } from '@angular/core';

import { ActiveFontInstanceEffectsModule } from './active-font-instance/active-font-instance-effects.module';
import { FontLibraryEffectsModule } from './font-library/font-library-effects.module';
import { ActiveFontSetModule } from './active-font-set/active-font-set.module';
import { ActiveFontSetEffectsModule } from './active-font-set/active-font-set-effects.module';
import { FontInstanceLibraryEffectsModule } from './font-instance-library/font-instance-library-effects.module';
import { FontSetLibraryEffectsModule } from './font-set-library/font-set-library-effects.module';
import { FontTypeStoreModule } from './font-type/font-type-store.module';

@NgModule({
  declarations: [],
  imports: [
    ActiveFontSetModule,
    ActiveFontInstanceEffectsModule,
    FontLibraryEffectsModule,
    ActiveFontSetEffectsModule,
    FontInstanceLibraryEffectsModule,
    FontSetLibraryEffectsModule,
    FontTypeStoreModule
  ]
})
export class AppStoreModule { }
