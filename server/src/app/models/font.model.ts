export interface DbFont {
  id: number;
  family: string;
  selectable: boolean;
  blacklisted: boolean;
}

export interface DbFontInstance {
  font: DbFont;
  href?: string | null;
  ui_label?: string | null;
  weight: string; // TODO: enum of font weight values on server side?
  italic: boolean;
  category: string; // TODO: enum?
}
