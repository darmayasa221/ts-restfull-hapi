import { hash } from 'bcrypt';
import { createContainer } from 'instances-container';
import { v4 as uuidv4 } from 'uuid';
import PasswordHash from '../Aplications/security/PasswordHash';
import AddUserUseCase from '../Aplications/use_case/AddUserUseCase';
import UserRepository from '../Domains/users/UserRepository';
import pool from './database/postgres/pool';
import UserRepositoryPostgres from './repository/UserRepositoryPostgres';
import BcryptPasswordHash from './security/BcryptPasswordHash';
// creating container
const container = createContainer();

// registering services and repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: uuidv4,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: hash,
        },
      ],
    },
  },
]);

// registering use cases
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
]);

export default container;
