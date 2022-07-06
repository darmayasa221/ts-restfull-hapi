"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const handler_1 = __importDefault(require("./handler"));
const routes_1 = __importDefault(require("./routes"));
module.exports = {
    name: 'users',
    register: async (server, container) => {
        const usersHandler = new handler_1.default(container);
        server.route((0, routes_1.default)(usersHandler));
    },
};
