export type FontWeight = '100' | '200' | '300' | 'regular' | '500' | '600' | '700' | '800' | '900';


// TODO: remove this, should come from DB
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
