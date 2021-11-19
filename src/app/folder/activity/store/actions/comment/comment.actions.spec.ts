import * as fromActivityComment from './comment.actions';

describe('loadActivityComments', () => {
  it('should return an action', () => {
    expect(fromActivityComment.loadActivityComments().type).toBe(
      '[ActivityComment] Load ActivityComments'
    );
  });
});
