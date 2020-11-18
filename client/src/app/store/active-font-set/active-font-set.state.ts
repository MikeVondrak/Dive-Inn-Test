import { FontInstance } from 'src/app/models/font-instance.model';
import { FontTypeIdKvp, FontTypeInstanceKvp } from 'src/app/models/font-type.model';
import { FontSet } from '../../models/font-set.model';

export interface ActiveFontSetState {
  readonly setId: number,
  readonly name: string,
  readonly lastUpdated: Date,
  //readonly typeInstanceMap: Map<string, number>,
  readonly typeInstances: FontTypeIdKvp[],
  readonly fontInstances: FontTypeInstanceKvp[],
  readonly fontSetLoading: boolean,
  readonly fontSetLoaded: boolean,
  readonly fontSetError: boolean,
}

export const activeFontSetInitialState: ActiveFontSetState = {
  setId: -1,
  name: '',
  lastUpdated: undefined,
  //typeInstanceMap: new Map<string, number>(),
  typeInstances: [],
  fontInstances: [],
  fontSetLoading: false,
  fontSetLoaded: false,
  fontSetError: false,
}
