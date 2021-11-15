import * as fromDisaster from './disaster.actions';

describe('loadDisasters', () => {
  it('should return an action', () => {
    expect(fromDisaster.loadDisasters().type).toBe('[Disaster] Load Disasters');
  });
});
