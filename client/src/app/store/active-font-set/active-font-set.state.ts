import { FontInstance } from 'src/app/models/font-instance.model';
import { FontSet } from '../../models/font-set.model';

export interface ActiveFontSetState {
  readonly setId: number,
  readonly name: string,
  readonly lastUpdated: Date,
  readonly typeInstanceMap: Map<string, number>,
  readonly fontInstances: FontInstance[],
  readonly fontSetLoading: boolean,
  readonly fontSetLoaded: boolean,
  readonly fontSetError: boolean,
}

export const activeFontSetInitialState: ActiveFontSetState = {
  setId: -1,
  name: '',
  lastUpdated: undefined,
  typeInstanceMap: new Map<string, number>(),
  fontInstances: [],
  fontSetLoading: false,
  fontSetLoaded: false,
  fontSetError: false,
}
