import { FontTypeInstanceMap } from './font-type.model';

export interface FontSet {
  setId: string,
  name: string,
  // lastUpdated: Date, // future enhancement?
  typeInstanceMap: FontTypeInstanceMap;
}


export interface FontSetListView {
  setId: string,
  name: string,
  
  // future enhancement options
  // lastUpdated: Date,
  // author
  // voteCount
}