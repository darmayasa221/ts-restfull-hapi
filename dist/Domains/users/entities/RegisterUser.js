"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisterUser {
    constructor(payload) {
        this.verifyPayload(payload);
        const { username, password, fullname, } = payload;
        this.username = username;
        this.password = password;
        this.fullname = fullname;
    }
    verifyPayload({ username, password, fullname }) {
        if (!username || !password || !fullname) {
            throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
        }
        if (typeof username !== 'string' || typeof password !== 'string' || typeof fullname !== 'string') {
            throw new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}
exports.default = RegisterUser;
