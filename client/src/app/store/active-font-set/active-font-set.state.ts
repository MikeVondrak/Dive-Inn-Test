import { FontInstance } from 'src/app/models/font-instance.model';
import { FontTypeInstanceIdPair } from 'src/app/models/font-type.model';
import { FontSet } from '../../models/font-set.model';

export interface ActiveFontSetState {
  readonly setId: number,
  readonly name: string,
  readonly lastUpdated: Date,
  
  readonly fontTypeInstanceIds: FontTypeInstanceIdPair[],

  readonly activeFontSetLoading: boolean,
  readonly activeFontSetLoaded: boolean,
  readonly activeFontSetError: boolean,
}

export const activeFontSetInitialState: ActiveFontSetState = {
  setId: -1,
  name: '',
  lastUpdated: undefined,
  
  fontTypeInstanceIds: [],

  activeFontSetLoading: false,
  activeFontSetLoaded: false,
  activeFontSetError: false,
}
