"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_service_1 = require("./db.service");
//Create
const create = async (user) => {
    const result = await db_service_1.pool.query('INSERT INTO users(email, name, surname, password) VALUES($1, $2, $3, $4)', [user.email, user.name, user.surname, user.password]);
    return result.rowCount;
};
//Read
const getByEmail = async (email) => {
    const result = await db_service_1.pool.query('SELECT * FROM users where email like $1', [email]);
    return result.rows[0];
};
const getBySessionId = async (sessionId) => {
    const result = await db_service_1.pool.query('SELECT * FROM session where sid like $1', [sessionId]);
    return result.rows[0].sess.passport.user;
};
module.exports = {
    create,
    getByEmail,
    getBySessionId
};
