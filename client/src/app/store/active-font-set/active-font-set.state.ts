import { FontSet } from '../../models/font-set.model';

export interface ActiveFontSetState {
  readonly setId: number,
  readonly name: string,
  readonly lastUpdated: Date,
  readonly typeInstanceMap: Map<string, number>,
}

export const activeFontSetInitialState: ActiveFontSetState = {
  setId: -1,
  name: '',
  lastUpdated: undefined,
  typeInstanceMap: new Map<string, number>()
}
