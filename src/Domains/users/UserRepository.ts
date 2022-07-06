/* eslint-disable no-unused-vars */
import RegisteredUser from './entities/RegisteredUser';
import RegisterUser from './entities/RegisterUser';

export interface UserRepository {
  addUser(registerUser: RegisterUser): Promise<RegisteredUser>
  verifyAvailableUsername(username: string): Promise<void>
}
