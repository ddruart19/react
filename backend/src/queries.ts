import { Request, Response } from "express";
const Pool = require('pg').Pool
const pool  = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: 5432,
    ssl: { rejectUnauthorized: false }
})

interface taskDB {
    id: string;
    name: string;
    completed: boolean;
    date: string;
  }
 
//Fetch All tasks
const getTasks = (request : Request, response : Response) => {
    pool.query('SELECT * FROM task', (error: Error, results: { rows: taskDB[]; }) => {
        if (error) throw error
        response.status(200).json(results.rows)
    })
}

//Fetch task by id
const getTaskById = (request : Request, response : Response) => {
    pool.query('SELECT * FROM task where task.id = $1', [request.params.id], (error: Error, results: { rows: taskDB[]; }) => {
        if (error) throw error
        response.status(200).json(results.rows[0])
    })
}

//Create task
const createTask = (request : Request, response : Response) => {
    pool.query('INSERT INTO task(name, completed, date) VALUES($1, $2, $3)', [request.body.name, request.body.completed, request.body.date], (error: Error, results: { rows: taskDB[]; }) => {
        if(error) throw error
        response.status(200).send("Task successfully added")
    })
}

//Update task
const updateTask = (request: Request, response: Response) => {
    pool.query('UPDATE task SET name = $1, completed = $2, date = $3 WHERE id = $4;', [request.body.name, request.body.completed, request.body.date, request.params.id], (error: Error, results: { rows: taskDB[]; }) => {
        if(error) throw error
        response.status(200).send("Task successfully updated")
    })
}

//Delete task
const deleteTask = (request: Request, response: Response) => {
    pool.query('DELETE from task where task.id = $1', [request.params.id], (error: Error, results: { rows: taskDB[]; }) => {
        if(error) throw error
        response.status(200).send("Task successfully deleted")
    })
}

//Validate task
const validateTask = (request: Request, response: Response) => {
    pool.query('UPDATE task SET completed = $1 WHERE id = $2;', [request.body.completed, request.params.id], (error: Error, results: { rows: taskDB[]; }) => {
        if(error) throw error
        response.status(200).send("Task successfully validated")
    })
}

module.exports ={
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    validateTask
}