import * as fromSecurecode from './securecode.actions';

describe('createSecurecode', () => {
  it('should return an action', () => {
    expect(fromSecurecode.createSecurecode().type).toBe(
      '[Securecode] Create Securecode'
    );
  });
});
