import { FontInstance } from '../models/font-instance.model';
import { FontWeight } from '../services/api/font/font.api.model';

export interface AppState {
  // readonly fontInstance: FontInstance,

  readonly previewFontFamily: string,
  readonly previewFontSize: string,
  // readonly previewFontWeight: FontWeight,
  readonly previewFontItalic: boolean,

  // readonly googleFontRequested: boolean,
  // readonly googleFontLoading: boolean,
  // readonly googleFontLoaded: boolean,
  // readonly googleFontError: boolean,
}

export const initialState: AppState = {
  // fontInstance: null,

  previewFontFamily: '',
  previewFontSize: '0px',
  // previewFontWeight: 'regular',
  previewFontItalic: false,

  // googleFontRequested: false,
  // googleFontLoading: false,
  // googleFontLoaded: false,
  // googleFontError: false,
}