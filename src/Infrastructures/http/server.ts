import Hapi from '@hapi/hapi';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import AddUserUseCase from '../../Aplications/use_case/AddUserUseCase';
import users from '../../Interfaces/http/api/users/index';
import UserRepositoryPostgres from '../repository/UserRepositoryPostgres';
import pool from '../database/postgres/pool';
import BcryptPasswordHash from '../security/BcryptPasswordHash';

export interface Container {
  addUserUseCase: AddUserUseCase
}
const createServer = async () => {
  const userRepository = new UserRepositoryPostgres(pool, uuidv4);
  const passwordHash = new BcryptPasswordHash(bcrypt);
  const addUserUseCase = new AddUserUseCase({ userRepository, passwordHash });
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  });
  await server.register([
    {
      plugin: users,
      options: {
        addUserUseCase,
      },
    },
  ]);
  return server;
};
export default createServer;
