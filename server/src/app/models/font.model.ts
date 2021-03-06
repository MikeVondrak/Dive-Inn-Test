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
  id?: number,
  set_id: string,
  set_name: string,
  fk_font_type_id: number,
  fk_font_instance_id: number,
  //last_updated: Date
}

export interface DbFontSetReturn {
  set_id: string,
  set_name: string,
  last_updated: Date,
  type_instance_map: Map<string, number>
}

export interface DbFontType {
  id: number,
  type: string,
}

export interface DbFontWeight {
  id: number,
  weight: string,
}
