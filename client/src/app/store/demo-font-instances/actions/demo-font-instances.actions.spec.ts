import * as fromDemoFontInstances from './demo-font-instances.actions';

describe('loadDemoFontInstancess', () => {
  it('should return an action', () => {
    expect(fromDemoFontInstances.loadDemoFontInstancess().type).toBe('[DemoFontInstances] Load DemoFontInstancess');
  });
});
