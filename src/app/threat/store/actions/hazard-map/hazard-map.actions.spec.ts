import * as fromHazardMap from './hazard-map.actions';

describe('loadHazardMaps', () => {
  it('should return an action', () => {
    expect(fromHazardMap.loadHazardMaps().type).toBe(
      '[HazardMap] Load HazardMaps'
    );
  });
});
