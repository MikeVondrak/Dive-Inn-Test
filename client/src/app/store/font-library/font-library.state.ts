export interface FontLibraryState {
  readonly fontDataLoading: boolean,
  readonly fontDataLoaded: boolean,
  readonly fontDataError: boolean,
}


/**
 * @TODO use NgRx entity here??
 */
export const fontLibraryInitialState: FontLibraryState = {
  fontDataLoading: false,
  fontDataLoaded: false,
  fontDataError: false,
}
