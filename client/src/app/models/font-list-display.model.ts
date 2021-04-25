import { IUiFont } from './ui-font.model';

export interface FontListDisplayFont extends IUiFont {
  setsFontIsUsedIn: string[]
  //setsFontIsUsedIn: Set<string>;
}