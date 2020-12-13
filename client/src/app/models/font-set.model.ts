import { KeyValueNumber } from './app.model';
import { FontTypeInstanceSet } from './font-type.model';

export interface FontSet {
  //id: number,
  setId: number,
  name: string,
  lastUpdated: Date,
   
  //typeInstanceIdsMap: KeyValueNumber[];
  //typeInstanceMap: Map<FontTypeInstancePair> // maps the font type (e.g. "header") to a specific font instance to compose a set
  typeInstanceSet: FontTypeInstanceSet;
  
}


export interface FontSetListView {
  setId: number,
  name: string,
  
  // future enhancement options
  // lastUpdated: Date,
  // author
  // voteCount
}