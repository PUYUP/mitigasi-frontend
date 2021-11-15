import * as fromUser from './user.actions';

describe('signupUser', () => {
  it('should return an action', () => {
    expect(fromUser.signupUser().type).toBe('[User] Create User');
  });
});
