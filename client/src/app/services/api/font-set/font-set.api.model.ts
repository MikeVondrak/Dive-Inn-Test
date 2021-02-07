import { KeyValueNumber } from "src/app/models/app.model";
import { FontTypeInstanceIdPair } from 'src/app/models/font-type.model';

/**
 * represents a single row from the font_set table
 * sets are stored in multiple rows in the DB and matched by setId
 */
export interface FontSetApi {
  id?: number;
  set_id: number;
  set_name: string;
  fk_font_type_id: number;
  fk_font_instance_id: number;
}

export interface FontSetApiMapped {
  set_id: number;
  set_name: string;
  typeInstanceIdMap: FontTypeInstanceIdPair[];
}

export function fontSetApiMappedToFontSetApiArray(fontSet: FontSetApiMapped): FontSetApi[] {
  let fontSetApis: FontSetApi[] = [];
  let fontSetApi: FontSetApi;

  // break FontSet up into an array of FontSetApi for table rows
  fontSet.typeInstanceIdMap.map(ti => {
    fontSetApi = {
      id: ti.entityId,
      set_id: fontSet.set_id,
      set_name: fontSet.set_name,
      fk_font_type_id: ti.typeId,
      fk_font_instance_id: ti.instanceId,
    }
    fontSetApis.push(fontSetApi);
  });
  return fontSetApis;
}