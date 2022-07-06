import bcyrpt from 'bcrypt';
import BcryptPasswordHash from '../BcryptPasswordHash';

describe('BcryptPasswordHash', () => {
  describe('hash function', () => {
    it('should encrypt password correctly', async () => {
      // Arrange
      const spyHash = jest.spyOn(bcyrpt, 'hash');
      const bcryptPasswordHash = new BcryptPasswordHash(bcyrpt);
      // Action
      const encryptedPassword = await bcryptPasswordHash.hash('plain_password');
      // Assert
      expect(typeof encryptedPassword).toEqual('string');
      expect(encryptedPassword).not.toEqual('plain_password');
      expect(spyHash).toBeCalledWith('plain_password', 10);
    });
  });
});
