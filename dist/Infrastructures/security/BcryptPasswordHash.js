"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BcryptPasswordHash {
    constructor(bcrypt, saltRound = 10) {
        this.bcrypt = bcrypt;
        this.saltRound = saltRound;
    }
    async hash(password) {
        return this.bcrypt.hash(password, this.saltRound);
    }
}
exports.default = BcryptPasswordHash;
