import { FontSet } from 'src/app/models/font-set.model';

export interface FontSetLibraryState {
  readonly fontSets: FontSet[],
  readonly fontSetsLoading: boolean,
  readonly fontSetsLoaded: boolean,
  readonly fontSetsError: boolean,
}

/**
 * @TODO use NgRx entity here??
 */
export const fontSetLibraryInitialState: FontSetLibraryState = {
  fontSets: [],
  fontSetsLoading: false,
  fontSetsLoaded: false,
  fontSetsError: false,
}
