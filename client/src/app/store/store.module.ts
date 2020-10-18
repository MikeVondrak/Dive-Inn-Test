import { NgModule } from '@angular/core';
import { ActiveFontInstanceEffectsModule } from './active-font-instance/active-font-instance-effects.module';
import { FontLibraryEffectsModule } from './font-library/font-library-effects.module';

@NgModule({
  declarations: [],
  imports: [
    ActiveFontInstanceEffectsModule,
    FontLibraryEffectsModule
  ]
})
export class AppStoreModule { }
