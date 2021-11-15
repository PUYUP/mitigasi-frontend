import * as fromActivitySafetyCheck from './safetycheck.actions';

describe('loadActivitySafetyChecks', () => {
  it('should return an action', () => {
    expect(fromActivitySafetyCheck.loadActivitySafetyChecks().type).toBe(
      '[ActivitySafetyCheck] Load ActivitySafetyChecks'
    );
  });
});
