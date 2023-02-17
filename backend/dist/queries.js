"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: 5432
});
//Fetch All tasks
const getTasks = (request, response, next) => {
    pool.query('SELECT * FROM task', (error, results) => {
        //Send error to middleware error handling function
        if (error)
            return next(error);
        if (typeof results.rows === "undefined")
            response.status(404).json("Tasks not found");
        response.status(200).json(results.rows);
    });
};
//Fetch task by id
const getTaskById = (request, response, next) => {
    pool.query('SELECT * FROM task where task.id = $1', [request.params.id], (error, results) => {
        //Send error to middleware error handling function
        if (error)
            return next(error);
        //Return 404 not found if result is undefined
        if (typeof results.rows[0] === "undefined")
            response.status(404).json("Task not found");
        response.status(200).json(results.rows[0]);
    });
};
//Create task
const createTask = (request, response, next) => {
    pool.query('INSERT INTO task(name, completed, date) VALUES($1, $2, $3)', [request.body.name, request.body.completed, request.body.date], (error, results) => {
        //Send error to middleware error handling function
        if (error)
            return next(error);
        response.status(201).send("Task successfully added");
    });
};
//Update task
const updateTask = (request, response, next) => {
    pool.query('UPDATE task SET name = $1, completed = $2, date = $3 WHERE id = $4;', [request.body.name, request.body.completed, request.body.date, request.params.id], (error, results) => {
        //Send error to middleware error handling function
        if (error)
            return next(error);
        response.status(200).send("Task successfully updated");
    });
};
//Delete task
const deleteTask = (request, response, next) => {
    pool.query('DELETE from task where task.id = $1', [request.params.id], (error, results) => {
        //Send error to middleware error handling function
        if (error)
            return next(error);
        response.status(204).send("Task successfully deleted");
    });
};
//Validate task
const validateTask = (request, response, next) => {
    pool.query('UPDATE task SET completed = $1 WHERE id = $2;', [request.body.completed, request.params.id], (error, results) => {
        //Send error to middleware error handling function
        if (error)
            return next(error);
        response.status(200).send("Task successfully validated");
    });
};
module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    validateTask
};
