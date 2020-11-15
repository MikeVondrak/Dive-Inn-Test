import { FontInstance } from '../../models/font-instance.model';
import { FontWeight } from '../../services/api/font/font.api.model';

export interface ActiveFontInstanceState {
  readonly activeFontInstanceId: number,
  readonly activeFontFamily: string,
  readonly activeFontSize: string,
  readonly activeFontWeight: FontWeight,
  readonly activeFontItalic: boolean,
}

export const activeFontInstanceInitialState: ActiveFontInstanceState = {
  activeFontInstanceId: -1,
  activeFontFamily: '',
  activeFontSize: '0px',
  activeFontWeight: 'regular',
  activeFontItalic: false,
}
