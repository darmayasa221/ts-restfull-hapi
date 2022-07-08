/* eslint-disable no-unused-vars */
import { IRegisteredUser } from './entities/RegisteredUser';
import { IRegisterUser } from './entities/RegisterUser';

export default abstract class UserRepository {
  abstract addUser(registerUser: IRegisterUser): Promise<IRegisteredUser>

  abstract verifyAvailableUsername(username: string): Promise<void>
}
