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
const getTasks = (request : Request, response : Response) => {
    pool.query('SELECT * FROM task', (error: Error, results: { rows: any; }) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//Fetch task by id
const getTaskById = (request : Request, response : Response, id: Number) => {
    pool.query('SELECT * FROM task where task.id = ' + request.params.id, (error: Error, results: { rows: any; }) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports ={
    getTasks,
    getTaskById
}