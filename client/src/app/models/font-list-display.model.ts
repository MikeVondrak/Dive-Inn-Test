import { IUiFont } from './ui-font.model';

export interface FontListDisplayFont extends IUiFont {
  setsFontIsUsedIn: Set<string>;
}