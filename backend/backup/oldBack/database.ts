// const Pool = require('pg').Pool
import {Pool} from "pg"
export const pool  = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: 5432
})
export default pool;