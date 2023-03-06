"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const dbConfig = require('../configs/db.config');
exports.pool = new pg_1.Pool(dbConfig);
