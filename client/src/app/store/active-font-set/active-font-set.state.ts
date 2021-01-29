import { FontInstance } from 'src/app/models/font-instance.model';
import { FontTypeInstanceIdPair } from 'src/app/models/font-type.model';
import { FontSet } from '../../models/font-set.model';

export interface ActiveFontSetState {
  readonly setId: number,
  readonly name: string,
  readonly saved: boolean,
  // readonly lastUpdated: Date,
  
  readonly fontTypeInstanceIds: FontTypeInstanceIdPair[],

  readonly activeFontSetLoading: boolean,
  readonly activeFontSetLoaded: boolean,
  readonly activeFontSetError: boolean,

  readonly activeFontSetInstanceLoading: boolean,
  readonly activeFontSetInstanceLoaded: boolean,
  readonly activeFontSetInstanceError: boolean,
}

export const activeFontSetInitialState: ActiveFontSetState = {
  setId: -1,
  name: '',
  saved: false,
  // lastUpdated: undefined,
  
  fontTypeInstanceIds: [],

  activeFontSetLoading: false,
  activeFontSetLoaded: false,
  activeFontSetError: false,

  activeFontSetInstanceLoading: false,
  activeFontSetInstanceLoaded: false,
  activeFontSetInstanceError: false,
}
