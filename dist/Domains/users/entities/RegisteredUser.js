"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisteredUser {
    constructor(payload) {
        this.verifyPaylod(payload);
        const { id, username, fullname } = payload;
        this.id = id;
        this.username = username;
        this.fullname = fullname;
    }
    verifyPaylod({ id, username, fullname, }) {
        if (!id || !username || !fullname) {
            throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
        }
        if (typeof id !== 'string' || typeof username !== 'string' || typeof fullname !== 'string') {
            throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}
exports.default = RegisteredUser;
