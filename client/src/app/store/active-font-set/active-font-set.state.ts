import { FontInstance } from 'src/app/models/font-instance.model';
import { FontTypeInstanceKvp } from 'src/app/models/font-type.model';
import { FontSet } from '../../models/font-set.model';

export interface ActiveFontSetState {
  readonly id: number,
  readonly setId: number,
  readonly name: string,
  readonly lastUpdated: Date,
  //readonly typeInstances: FontTypeIdKvp[],
  readonly fontInstances: FontTypeInstanceKvp[],
  readonly fontSetLoading: boolean,
  readonly fontSetLoaded: boolean,
  readonly fontSetError: boolean,
}

export const activeFontSetInitialState: ActiveFontSetState = {
  id: -1,
  setId: -1,
  name: '',
  lastUpdated: undefined,
  //typeInstances: [],
  fontInstances: [],
  fontSetLoading: false,
  fontSetLoaded: false,
  fontSetError: false,
}
