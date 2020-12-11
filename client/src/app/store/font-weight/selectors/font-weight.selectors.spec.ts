import { fontWeightFeatureKey } from '../entity/font-weight.entity';
import * as fromFontWeight from '../reducers/font-weight.reducer';
import { selectFontWeightState } from './font-weight.selectors';

describe('FontWeight Selectors', () => {
  it('should select the feature state', () => {
    const result = selectFontWeightState({
      [fontWeightFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
