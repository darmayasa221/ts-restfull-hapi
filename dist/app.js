"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const server_1 = __importDefault(require("./Infrastructures/http/server"));
(0, dotenv_1.config)();
const start = async () => {
    const server = await (0, server_1.default)();
    await server.start();
    console.log(`server start at${server.info.uri}`);
};
start();
