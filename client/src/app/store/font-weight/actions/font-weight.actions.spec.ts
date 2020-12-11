import * as fromFontWeight from './font-weight.actions';

describe('loadFontWeights', () => {
  it('should return an action', () => {
    expect(fromFontWeight.loadFontWeights().type).toBe('[FontWeight] Load FontWeights');
  });
});
