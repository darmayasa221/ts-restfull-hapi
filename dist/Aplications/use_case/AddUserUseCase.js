"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RegisterUser_1 = __importDefault(require("../../Domains/users/entities/RegisterUser"));
class AddUserUseCase {
    constructor({ userRepository, passwordHash }) {
        this.userRepository = userRepository;
        this.passwordHash = passwordHash;
    }
    async execute(useCasePayload) {
        const registerUser = new RegisterUser_1.default(useCasePayload);
        await this.userRepository.verifyAvailableUsername(registerUser.username);
        registerUser.password = await this.passwordHash.hash(registerUser.password);
        return this.userRepository.addUser(registerUser);
    }
}
exports.default = AddUserUseCase;
