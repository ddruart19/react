import { Request, Response, NextFunction } from "express";

// const pool = require('./database')
import pool from "./database";

interface taskDB {
    id: string;
    name: string;
    completed: boolean;
    date: string;
    user_id: number;
  }
 
//Fetch All tasks
const getTasks = (request : Request, response : Response, next: NextFunction) => {
    pool.query('SELECT * FROM task', (error: Error, results: { rows: taskDB[]; }) => {
        //Send error to middleware error handling function
        if(error) return next(error) 
        if(typeof results.rows === "undefined")response.status(404).json("Tasks not found")

        response.status(200).json(results.rows)
    })
}


//Fetch task by id
const getTaskById = (request : Request, response : Response, next: NextFunction) => {
    pool.query('SELECT * FROM task where task.id = $1', [request.params.id], (error: Error, results: { rows: taskDB[]; }) => {
        //Send error to middleware error handling function
        if(error) return next(error) 
        //Return 404 not found if result is undefined
        if(typeof results.rows[0] === "undefined")response.status(404).json("Task not found")

        response.status(200).json(results.rows[0])
    })
}

//Create task
const createTask = (request : Request, response : Response, next: NextFunction) => {
    const { body } = request;
    pool.query('INSERT INTO task(name, completed, date, user_id) VALUES($1, $2, $3, $4)', [body.name, body.completed, body.date, body.user_id], (error: Error, results: { rows: taskDB[]; }) => {
        //Send error to middleware error handling function
        if(error) return next(error) 

        response.status(201).send("Task successfully added")
    })
}

//Update task
const updateTask = (request: Request, response: Response, next: NextFunction) => {
    pool.query('UPDATE task SET name = $1, completed = $2, date = $3 WHERE id = $4;', [request.body.name, request.body.completed, request.body.date, request.params.id], (error: Error, results: { rows: taskDB[]; }) => {
        //Send error to middleware error handling function
        if(error) return next(error) 

        response.status(200).send("Task successfully updated")
    })
}

//Delete task
const deleteTask = (request: Request, response: Response, next: NextFunction) => {
    pool.query('DELETE from task where task.id = $1', [request.params.id], (error: Error, results: { rows: taskDB[]; }) => {
        //Send error to middleware error handling function
        if(error) return next(error) 

        response.status(204).send("Task successfully deleted")
    })
}

//Validate task
const validateTask = (request: Request, response: Response, next: NextFunction) => {
    pool.query('UPDATE task SET completed = $1 WHERE id = $2;', [request.body.completed, request.params.id], (error: Error, results: { rows: taskDB[]; }) => {
        //Send error to middleware error handling function
        if(error) return next(error) 

        response.status(200).send("Task successfully validated")
    })
}

//Search with text
const searchTaskWithText = (request: Request, response: Response, next: NextFunction) => {
    pool.query('SELECT * FROM task where to_tsvector(name) @@ to_tsquery($1)', [request.body.search], (error: Error, results: { rows: taskDB[]; }) => {
        //Send error to middleware error handling function
        if(error) return next(error) 
        //Return 404 not found if result is undefined
        if(typeof results.rows === "undefined")response.status(404).json("Task not found")

        response.status(200).json(results.rows)
    })
}

module.exports ={
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    validateTask,
    searchTaskWithText
}