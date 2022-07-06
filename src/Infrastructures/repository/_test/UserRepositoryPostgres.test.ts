import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper';
import InvariantError from '../../../Commons/exceptions/InvariantError';
import RegisteredUser from '../../../Domains/users/entities/RegisteredUser';
import RegisterUser from '../../../Domains/users/entities/RegisterUser';
import pool from '../../database/postgres/pool';
import UserRepositoryPostgres from '../UserRepositoryPostgres';

describe('UserRepositoryPostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });
  afterAll(async () => {
    await pool.end();
  });
  describe('verifyAvailableUsername function', () => {
    it('should throw error when username available', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'jhon' });
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {} as any);

      // Action and Assert
      await expect(userRepositoryPostgres.verifyAvailableUsername('jhon'))
        .rejects.toThrowError(InvariantError);
    });
    it('shpuld throw error when username not available', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {} as any);

      // Action and Assert
      await expect(userRepositoryPostgres.verifyAvailableUsername('jhon'))
        .resolves.not.toThrowError(InvariantError);
    });
  });
  describe('addUser function', () => {
    it('should persist register user', async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: 'jhon',
        fullname: 'jhon test',
        password: 'secret',
      });
      const fakeIdGenerator = () => '0001';
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);
      // Action
      await userRepositoryPostgres.addUser(registerUser);
      // Assert
      const users = await UsersTableTestHelper.findUserById('user-0001');
      expect(users).toHaveLength(1);
    });
    it('should return registered user correctly', async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: 'jhon',
        password: 'secret',
        fullname: 'jhon test',
      });
      const fakeIdGenerator = () => '0001';
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);
      // Action
      const registeredUser = await userRepositoryPostgres.addUser(registerUser);
      // Assert
      expect(registeredUser).toStrictEqual(new RegisteredUser({
        id: 'user-0001',
        username: 'jhon',
        fullname: 'jhon test',
      }));
    });
  });
});
