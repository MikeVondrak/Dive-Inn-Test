export interface DbFont {
  id: number;
  family: string;
  selectable: boolean;
  blacklisted: boolean;
}

export interface DbFontInstance {
  id: number;
  family: string;
  weight: string;
  italic: boolean;
  size: number;
}
