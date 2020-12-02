import * as fromFontType from './font-type.actions';

describe('loadFontTypes', () => {
  it('should return an action', () => {
    expect(fromFontType.loadFontTypes().type).toBe('[FontType] Load FontTypes');
  });
});
