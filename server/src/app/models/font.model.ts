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

export interface DbFontSet {
  id: number,
  set_id: number,
  set_name: string,
  fk_font_type_id: number,
  font_type_name: string,
  fk_font_instance_id: number,
  last_updated: Date
}

export interface DbFontSetReturn {
  set_id: number,
  set_name: string,
  last_updated: Date,
  type_instance_map: Map<string, number>
}

export interface DbFontType {
  id: number,
  type: string,
}
