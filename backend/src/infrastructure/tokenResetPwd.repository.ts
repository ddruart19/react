import {pool} from "./db.service"

const getByUserId = async (id: number) => {
    const result = await pool.query('SELECT * FROM pwd_reset_token where user_id = $1', 
    [id])
    return result.rows[0]
}

const getByToken = async (token: string) => {
    const result = await pool.query('SELECT * FROM pwd_reset_token where token like $1', 
    [token])
    return result.rows[0]
}

module.exports = {
    getByUserId,
    getByToken
}