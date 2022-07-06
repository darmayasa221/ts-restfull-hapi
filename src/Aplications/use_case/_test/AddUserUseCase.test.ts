import RegisteredUser from '../../../Domains/users/entities/RegisteredUser';
import RegisterUser, { UserRegister } from '../../../Domains/users/entities/RegisterUser';
import { UserRepository } from '../../../Domains/users/UserRepository';
import { PasswordHash } from '../../security/PasswordHash';
import AddUserUseCase from '../AddUserUseCase';

describe('AddUserUseCase', () => {
  it('should orchestrating the add user action correctly', async () => {
    // Arrange
    const useCasePayload: UserRegister = {
      username: 'jhon',
      password: 'secret',
      fullname: 'jhon test',
    };

    const expectedRegisteredUser = new RegisteredUser({
      id: 'user-0001',
      username: useCasePayload.username,
      fullname: useCasePayload.fullname,
    });
    /** creating dependency of use case mock needed function */
    const mockUserRepository: UserRepository = {
      verifyAvailableUsername: jest.fn().mockImplementation(() => Promise.resolve()),
      addUser: jest.fn().mockImplementation(() => Promise.resolve(expectedRegisteredUser)),
    };

    const mockPasswordHash: PasswordHash = {
      hash: jest.fn().mockImplementation(() => Promise.resolve('encrypted_password')),
    };
    /** creating use case instance */
    const getUserUseCase = new AddUserUseCase({
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash,
    });
    // Action
    const registeredUser = await getUserUseCase.execute(useCasePayload);
    // Assert
    expect(registeredUser).toStrictEqual(expectedRegisteredUser);
    expect(mockUserRepository.verifyAvailableUsername).toBeCalledWith(useCasePayload.username);
    expect(mockPasswordHash.hash).toBeCalledWith(useCasePayload.password);
    expect(mockUserRepository.addUser).toBeCalledWith(new RegisterUser({
      username: useCasePayload.username,
      password: 'encrypted_password',
      fullname: useCasePayload.fullname,
    }));
  });
});
