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
        if (error) throw error
        response.status(200).json(results.rows)
    })
}

//Fetch task by id
const getTaskById = (request : Request, response : Response) => {
    pool.query('SELECT * FROM task where task.id = $1', [request.params.id], (error: Error, results: { rows: any; }) => {
        if (error) throw error
        response.status(200).json(results.rows)
    })
}

//Create task

const createTask = (request : Request, response : Response) => {
    pool.query('INSERT INTO task(name, completed, date) VALUES($1, $2, $3)', [request.body.taskName, request.body.completed, request.body.date], (error: Error, results: { rows: any; }) => {
        if(error) throw error
        response.send("Task successfully added")
    })
}

module.exports ={
    getTasks,
    getTaskById,
    createTask
}