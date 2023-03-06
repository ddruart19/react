import { UserInputCreate } from "src/models/users.model"
import {pool} from "./db.service"

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


module.exports = {
    create,
    getByEmail
}