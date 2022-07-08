import { IRegisteredUser } from '../../Domains/users/entities/RegisteredUser';
import RegisterUser, { IRegisterUser } from '../../Domains/users/entities/RegisterUser';
import UserRepository from '../../Domains/users/UserRepository';
import PasswordHash from '../security/PasswordHash';

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

  async execute(useCasePayload:IRegisterUser): Promise<IRegisteredUser> {
    const registerUser = new RegisterUser(useCasePayload);
    await this.userRepository.verifyAvailableUsername(registerUser.username);
    registerUser.password = await this.passwordHash.hash(registerUser.password);
    return this.userRepository.addUser(registerUser);
  }
}
