import { FontWeight } from 'src/app/models/font-weight.model';

export type FontVariants = Map<FontWeight, boolean>;

export interface FontApi {
  id?: number;
  family: string;
  selectable: boolean;
  blacklisted: boolean;
}

// Match data coming from DB
/** @TODO use the same interface for both BE and FE */
export interface FontApiInstance {
  family: string;
  weight: FontWeight;
  italic: boolean;
  size: number;
}
