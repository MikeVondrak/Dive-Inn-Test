import { ActiveFontInstanceState } from './active-font-instance/active-font-instance.state';
import { FontLibraryState } from './font-library/font-library.state';

export interface AppState {
  //selectionPage?: SelectionPageState

  activeFontInstance?: ActiveFontInstanceState,
  fontLibrary?: FontLibraryState,
}
