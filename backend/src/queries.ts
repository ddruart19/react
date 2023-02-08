import { Request, Response } from "express";
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todoapp',
  password: 'admin',
  port: 5432,
})

//Fetch All tasks
const getUsers = (request : Request, response : Response) => {
    pool.query('SELECT * FROM task', (error: any, results: { rows: any; }) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

module.exports ={
    getUsers
}