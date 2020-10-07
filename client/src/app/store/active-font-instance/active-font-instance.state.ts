import { FontInstance } from '../../models/font-instance.model';
import { FontWeight } from '../../services/api/font/font.api.model';

export interface ActiveFontInstanceState {
  readonly activeFontFamily: string,
  readonly activeFontSize: string,
  readonly activeFontWeight: FontWeight,
  readonly activeFontItalic: boolean,
}

export const activeFontInstanceInitialState: ActiveFontInstanceState = {
  activeFontFamily: '',
  activeFontSize: '0px',
  activeFontWeight: 'regular',
  activeFontItalic: false,
}
