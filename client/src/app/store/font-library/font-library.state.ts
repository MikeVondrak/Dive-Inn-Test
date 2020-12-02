export interface FontLibraryState {
  readonly loadedFonts: string[],
  readonly fontDataLoading: boolean,
  readonly fontDataLoaded: boolean,
  readonly fontDataError: boolean,
}


/**
 * @TODO use NgRx entity here??
 */
export const fontLibraryInitialState: FontLibraryState = {
  loadedFonts: [],
  fontDataLoading: false,
  fontDataLoaded: false,
  fontDataError: false,
}
