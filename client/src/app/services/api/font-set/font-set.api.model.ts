import { KeyValueNumber } from "src/app/models/app.model";

/**
 * represents a single row from the font_set table
 * sets are stored in multiple rows in the DB and matched by setId
 */
export interface FontSetApi {
    id: number;
    set_id: number;
    set_name: string;
    fk_font_type_id: number;
    fk_font_instance_id: number;
}

// export interface FontSetApiMapped {
//     id: number;
//     set_id: number;
//     set_name: string;
//     typeInstanceIdMap: KeyValueNumber[];
//     //fk_font_type_id: number;
//     //fk_font_instance_id: number;
//     //type: string;
// }