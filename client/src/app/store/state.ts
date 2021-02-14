import { FontLibraryState } from './font-library/font-library.state';
import { ActiveFontInstanceState } from './active-font-instance/active-font-instance.state';
import { ActiveFontSetState } from './active-font-set/active-font-set.state';
import { FontInstanceState } from './font-instance-library/entity/font-instance.entity';
import { FontSetState } from './font-set-library/entity/font-set.entity';
import { FontTypeState } from './font-type/entity/font-type.entity';
import { ModalState } from './modal/modal.state';

export interface AppState {
  fontLibrary?: FontLibraryState,
  fontInstanceLibrary?: FontInstanceState,
  activeFontInstance?: ActiveFontInstanceState,
  activeFontSet?: ActiveFontSetState,
  fontSets?: FontSetState,
  fontTypes?: FontTypeState,
  modalState?: ModalState,
}
