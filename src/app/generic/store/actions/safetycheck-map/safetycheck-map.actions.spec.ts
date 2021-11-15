import * as fromSafetyCheckMap from './safetycheck-map.actions';

describe('loadSafetyCheckMaps', () => {
  it('should return an action', () => {
    expect(fromSafetyCheckMap.loadSafetyCheckMaps().type).toBe(
      '[SafetyCheckMap] Load SafetyCheckMaps'
    );
  });
});
