export interface FontSet {
  id: number,
  setId: number,
  name: string,
  lastUpdated: Date,
  typeInstanceMap: Map<string, number> // maps the font type (e.g. "header") to a specific font instance to compose a set
  
  
  // voteCount - future enhancement maybe
}
