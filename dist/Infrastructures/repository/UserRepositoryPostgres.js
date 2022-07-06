"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvariantError_1 = __importDefault(require("../../Commons/exceptions/InvariantError"));
const RegisteredUser_1 = __importDefault(require("../../Domains/users/entities/RegisteredUser"));
class UserRepositoryPostgres {
    constructor(pool, idGenerator) {
        this.pool = pool;
        this.idGenerator = idGenerator;
    }
    async verifyAvailableUsername(username) {
        const query = {
            text: `SELECT username 
      FROM users
      WHERE username = $1`,
            values: [username],
        };
        const { rowCount } = await this.pool.query(query);
        if (rowCount) {
            throw new InvariantError_1.default('username not available');
        }
    }
    async addUser(registerUser) {
        const { username, password, fullname, } = registerUser;
        const id = `user-${this.idGenerator()}`;
        const query = {
            text: `INSERT INTO users
      VALUES($1, $2, $3, $4)
      RETURNING id, username, fullname`,
            values: [id, username, password, fullname],
        };
        const { rows } = await this.pool.query(query);
        return new RegisteredUser_1.default({ ...rows[0] });
    }
}
exports.default = UserRepositoryPostgres;
