import {Pool} from "pg"
const dbConfig = require('../configs/db.config')

export const pool  = new Pool(dbConfig)
