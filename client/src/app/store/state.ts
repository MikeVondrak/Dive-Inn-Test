import { FontLibraryState } from './font-library/font-library.state';
import { ActiveFontInstanceState } from './active-font-instance/active-font-instance.state';
import { ActiveFontSetState } from './active-font-set/active-font-set.state'

export interface AppState {
  fontLibrary?: FontLibraryState,
  activeFontInstance?: ActiveFontInstanceState,
  activeFontSet?: ActiveFontSetState,
}
