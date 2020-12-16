import { FontTypeInstanceMap } from './font-type.model';

export interface FontSet {
  setId: number,
  name: string,
  // lastUpdated: Date, // future enhancement?
  typeInstanceMap: FontTypeInstanceMap;
}


export interface FontSetListView {
  setId: number,
  name: string,
  
  // future enhancement options
  // lastUpdated: Date,
  // author
  // voteCount
}