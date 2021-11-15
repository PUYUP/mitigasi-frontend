import * as fromHazard from './hazard.actions';

describe('loadHazards', () => {
  it('should return an action', () => {
    expect(fromHazard.loadHazards().type).toBe('[Hazard] Load Hazards');
  });
});
