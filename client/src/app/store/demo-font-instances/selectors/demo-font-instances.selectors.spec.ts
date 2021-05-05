import * as fromDemoFontInstances from '../reducers/demo-font-instances.reducer';
import { selectDemoFontInstancesState } from './demo-font-instances.selectors';

describe('DemoFontInstances Selectors', () => {
  it('should select the feature state', () => {
    const result = selectDemoFontInstancesState({
      [fromDemoFontInstances.demoFontInstancesFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
