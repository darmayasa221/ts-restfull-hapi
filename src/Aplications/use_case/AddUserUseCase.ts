import RegisteredUser from '../../Domains/users/entities/RegisteredUser';
import RegisterUser, { UserRegister } from '../../Domains/users/entities/RegisterUser';
import { UserRepository } from '../../Domains/users/UserRepository';
import { PasswordHash } from '../security/PasswordHash';

interface IAddUserUseCase {
  userRepository: UserRepository
  passwordHash: PasswordHash
}

export default class AddUserUseCase {
  private userRepository: UserRepository;

  private passwordHash: PasswordHash;

  constructor({ userRepository, passwordHash }: IAddUserUseCase) {
    this.userRepository = userRepository;
    this.passwordHash = passwordHash;
  }

  async execute(useCasePayload:UserRegister): Promise<RegisteredUser> {
    const registerUser = new RegisterUser(useCasePayload);
    await this.userRepository.verifyAvailableUsername(registerUser.username);
    registerUser.password = await this.passwordHash.hash(registerUser.password);
    return this.userRepository.addUser(registerUser);
  }
}
