"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todoapp',
    password: 'admin',
    port: 5432,
});
//Fetch All tasks
const getTasks = (request, response) => {
    pool.query('SELECT * FROM task', (error, results) => {
        if (error)
            throw error;
        response.status(200).json(results.rows);
    });
};
//Fetch task by id
const getTaskById = (request, response) => {
    pool.query('SELECT * FROM task where task.id = $1', [request.params.id], (error, results) => {
        if (error)
            throw error;
        response.status(200).json(results.rows[0]);
    });
};
//Create task
const createTask = (request, response) => {
    pool.query('INSERT INTO task(name, completed, date) VALUES($1, $2, $3)', [request.body.name, request.body.completed, request.body.date], (error, results) => {
        if (error)
            throw error;
        response.status(200).send("Task successfully added");
    });
};
//Update task
const updateTask = (request, response) => {
    pool.query('UPDATE task SET name = $1, completed = $2, date = $3 WHERE id = $4;', [request.body.name, request.body.completed, request.body.date, request.params.id], (error, results) => {
        if (error)
            throw error;
        response.status(200).send("Task successfully updated");
    });
};
//Delete task
const deleteTask = (request, response) => {
    pool.query('DELETE from task where task.id = $1', [request.params.id], (error, results) => {
        if (error)
            throw error;
        response.status(200).send("Task successfully deleted");
    });
};
//Validate task
const validateTask = (request, response) => {
    pool.query('UPDATE task SET completed = $1 WHERE id = $2;', [request.body.completed, request.params.id], (error, results) => {
        if (error)
            throw error;
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