import { FontInstance } from 'src/app/models/font-instance.model';

export interface FontInstanceLibraryState {
  readonly loadedFontInstances: FontInstance[],

  readonly fontInstancesLoading: boolean,
  readonly fontInstancesLoaded: boolean,
  readonly fontInstancesError: boolean,

  readonly fontInstanceDataLoading: boolean,
  readonly fontInstanceDataLoaded: boolean,
  readonly fontInstanceDataError: boolean,
}

/**
 * @TODO use NgRx entity here??
 */
export const fontInstanceLibraryInitialState: FontInstanceLibraryState = {
  loadedFontInstances: [],
  fontInstancesLoading: false,
  fontInstancesLoaded: false,
  fontInstancesError: false,
  fontInstanceDataLoading: false,
  fontInstanceDataLoaded: false,
  fontInstanceDataError: false,
}
