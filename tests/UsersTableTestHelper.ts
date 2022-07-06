/* istanbul ignore file */

import { Query } from '../src/Commons/helper/database/query';
import pool from '../src/Infrastructures/database/postgres/pool';

export default class UsersTableTestHelper {
  static async addUser({
    id = 'user-',
    username = 'jhoni',
    password = 'secret',
    fullname = 'jhoni test',
  }): Promise<void> {
    const query: Query<string> = {
      text: `INSERT INTO users
      VALUES($1,$2,$3,$4)`,
      values: [id, username, password, fullname],
    };
    await pool.query(query);
  }

  static async findUserById(id: string): Promise<Array<string>> {
    const query: Query<string> = {
      text: `SELECT *
      FROM users
      WHERE id = $1`,
      values: [id],
    };

    const { rows } = await pool.query(query);
    return rows;
  }

  static async cleanTable(): Promise<void> {
    await pool.query('TRUNCATE TABLE users');
  }
}
