import { FontType } from '../../../models/font-type.model';
import { createEntityAdapter, EntityState } from '@ngrx/entity';


const fontTypeAdapter = createEntityAdapter<FontType>();

export interface FontTypeState extends EntityState<FontType> {
  // extended shape is:
  // EntityState<V> { 
  //   ids: string[]; 
  //   entities: { 
  //     [id: string]: V }; 
  // }
}
