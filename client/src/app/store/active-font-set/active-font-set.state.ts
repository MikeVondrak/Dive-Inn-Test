import { FontSet } from '../../models/font-set.model';

export interface ActiveFontSetState {
  readonly activeFontSet: FontSet
}

export const activeFontSetInitialState: ActiveFontSetState = {
  activeFontSet: {
    setId: -1,
    name: '',
    lastUpdated: undefined,
    typeInstanceMap: new Map<string, number>()
  }
}
