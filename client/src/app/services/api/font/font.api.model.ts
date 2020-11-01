export type FontWeight = '100' | '200' | '300' | 'regular' | '500' | '600' | '700' | '800' | '900';
export type FontCategory = 'header' | 'text' | 'nav' | 'title';

// MUST MATCH font_weight TABLE IN DB 
export const fontWeightIds: Map<FontWeight, number> = new Map([
  ['100', 1],
  ['200', 2],
  ['300', 3],
  ['regular', 4],
  ['500', 5],
  ['600', 6],
  ['700', 7],
  ['800', 8],
  ['900', 9],
]);


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
