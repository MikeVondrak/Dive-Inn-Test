import { FontInstance } from '../../models/font-instance.model';
import { FontWeight } from '../../models/font-weight.model';

export interface ActiveFontInstanceState {
  readonly activeFontInstanceId: number,
  readonly activeFontFamily: string,
  readonly activeFontSize: string,
  readonly activeFontWeight: FontWeight,
  readonly activeFontWeightId: number,
  readonly activeFontItalic: boolean,
}

export const activeFontInstanceInitialState: ActiveFontInstanceState = {
  activeFontInstanceId: -1,
  activeFontFamily: '',
  activeFontSize: '0px',
  activeFontWeight: 'regular',
  activeFontWeightId: 4,
  activeFontItalic: false,
}
