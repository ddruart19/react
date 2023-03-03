"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
// const Pool = require('pg').Pool
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: 5432
});
exports.default = exports.pool;
