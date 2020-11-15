import { FontLibraryState } from './font-library/font-library.state';
import { ActiveFontInstanceState } from './active-font-instance/active-font-instance.state';
import { ActiveFontSetState } from './active-font-set/active-font-set.state';
import { FontInstanceLibraryState } from './font-instance-library/font-instance-library.state';

export interface AppState {
  fontLibrary?: FontLibraryState,
  fontInstanceLibrary?: FontInstanceLibraryState,
  activeFontInstance?: ActiveFontInstanceState,
  activeFontSet?: ActiveFontSetState,
}
