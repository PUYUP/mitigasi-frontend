import * as fromSafetyCheck from './safetycheck.actions';

describe('loadSafetyChecks', () => {
  it('should return an action', () => {
    expect(fromSafetyCheck.loadSafetyChecks().type).toBe(
      '[SafetyCheck] Load SafetyChecks'
    );
  });
});
