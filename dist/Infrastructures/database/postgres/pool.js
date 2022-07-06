"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const testConfig = {
    host: process.env.PGHOST_TEST,
    port: Number(process.env.PGPORT_TEST),
    user: process.env.PGUSER_TEST,
    password: process.env.PGPASSWORD_TEST,
    database: process.env.PGDATABASE_TEST,
};
const pool = process.env.NODE_ENV === 'test' ? new pg_1.Pool(testConfig) : new pg_1.Pool();
exports.default = pool;
