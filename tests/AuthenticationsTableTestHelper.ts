/* istanbul ignore file */
import pool from '../src/Infrastructures/database/postgres/pool';
import { Query } from '../src/Commons/helper/database/query';

export default class AuthenticationTableHelper {
  static async addToken(token: string): Promise<void> {
    const query:Query<string> = {
      text: `INSERT INTO authentications
      VALUES($1)`,
      values: [token],
    };

    await pool.query(query);
  }

  static async findToken(token: string): Promise<Array<string>> {
    const query: Query<string> = {
      text: `SELECT token
      FROM authentications
      WHERE token = $1`,
      values: [token],
    };

    const { rows } = await pool.query(query);
    return rows;
  }

  static async cleanTable(): Promise<void> {
    await pool.query('TRUNCATE TABLE authentications');
  }
}
