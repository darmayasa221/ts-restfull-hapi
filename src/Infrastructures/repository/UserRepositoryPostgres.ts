import { Pool, QueryResult } from 'pg';
import InvariantError from '../../Commons/exceptions/InvariantError';
import { Query } from '../../Commons/helper/database/query';
import RegisteredUser, { UserRegistered } from '../../Domains/users/entities/RegisteredUser';
import RegisterUser from '../../Domains/users/entities/RegisterUser';
import { UserRepository } from '../../Domains/users/UserRepository';

export default class UserRepositoryPostgres implements UserRepository {
  private pool: Pool;

  private idGenerator: Function;

  constructor(pool: Pool, idGenerator: Function) {
    this.pool = pool;
    this.idGenerator = idGenerator;
  }

  async verifyAvailableUsername(username: string): Promise<void> {
    const query: Query<string> = {
      text: `SELECT username 
      FROM users
      WHERE username = $1`,
      values: [username],
    };

    const { rowCount } = await this.pool.query(query);
    if (rowCount) {
      throw new InvariantError('username not available');
    }
  }

  async addUser(registerUser: RegisterUser): Promise<RegisteredUser> {
    const {
      username,
      password,
      fullname,
    } = registerUser;
    const id = `user-${this.idGenerator()}`;
    const query: Query<string> = {
      text: `INSERT INTO users
      VALUES($1, $2, $3, $4)
      RETURNING id, username, fullname`,
      values: [id, username, password, fullname],
    };

    const { rows }:QueryResult<UserRegistered> = await this.pool.query(query);
    return new RegisteredUser({ ...rows[0] });
  }
}
