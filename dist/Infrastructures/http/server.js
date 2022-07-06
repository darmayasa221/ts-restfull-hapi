"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = __importDefault(require("@hapi/hapi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const AddUserUseCase_1 = __importDefault(require("../../Aplications/use_case/AddUserUseCase"));
const index_1 = __importDefault(require("../../Interfaces/http/api/users/index"));
const UserRepositoryPostgres_1 = __importDefault(require("../repository/UserRepositoryPostgres"));
const pool_1 = __importDefault(require("../database/postgres/pool"));
const BcryptPasswordHash_1 = __importDefault(require("../security/BcryptPasswordHash"));
const createServer = async () => {
    const userRepository = new UserRepositoryPostgres_1.default(pool_1.default, uuid_1.v4);
    const passwordHash = new BcryptPasswordHash_1.default(bcrypt_1.default);
    const addUserUseCase = new AddUserUseCase_1.default({ userRepository, passwordHash });
    const server = hapi_1.default.server({
        host: process.env.HOST,
        port: process.env.PORT,
    });
    await server.register([
        {
            plugin: index_1.default,
            options: {
                addUserUseCase,
            },
        },
    ]);
    return server;
};
exports.default = createServer;
