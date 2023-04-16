import { UserInputCreate } from "src/models/users.model"
import {pool} from "./db.service"
var keyGen = require("generate-key");

//Create
const create = async (user: UserInputCreate) => {
    const result = await pool.query(
        'INSERT INTO users(email, name, surname, password) VALUES($1, $2, $3, $4)',
        [user.email, user.name, user.surname, user.password])
    return result.rowCount
}

//Read
const getByEmail = async (email: string) => {
    const result = await pool.query('SELECT * FROM users where email like $1', 
    [email])
    return result.rows[0]
}

const getBySessionId = async (sessionId: string) => {
    const result = await pool.query('SELECT * FROM session where sid like $1',
    [sessionId])
    return result.rows[0].sess.passport.user
}

//Update
const updatePwd = async (user_id: number, password: string) => {
    const result = await pool.query('UPDATE users SET password = $1 WHERE id = $2;', 
    [password, user_id])
    return result.rowCount
}

//Create token for forgotten password
const setTokenForgottenPwd = async (userId: string) => {
    const result = await pool.query(
        'INSERT INTO pwd_reset_token(token, user_id) VALUES($1, $2)',
        [keyGen.generateKey(15), userId])
    return result.rowCount
}

module.exports = {
    create,
    getByEmail,
    getBySessionId,
    updatePwd,
    setTokenForgottenPwd
}