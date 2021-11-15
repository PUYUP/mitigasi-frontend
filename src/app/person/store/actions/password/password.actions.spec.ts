import * as fromPassword from './password.actions';

describe('loadPasswords', () => {
  it('should return an action', () => {
    expect(fromPassword.loadPasswords().type).toBe('[Password] Load Passwords');
  });
});
