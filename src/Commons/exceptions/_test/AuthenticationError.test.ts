import AuthenticationError from '../AuthenticationError';

describe('AuthenticationError', () => {
  it('shuld create Authentication error correctly', () => {
    const authenticationError = new AuthenticationError('authentication error');

    expect(authenticationError.statusCode).toEqual(401);
    expect(authenticationError.message).toEqual('authentication error');
    expect(authenticationError.name).toEqual('AuthenticationError');
  });
});
