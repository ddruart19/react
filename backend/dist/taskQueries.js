"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const pool = require('./database')
const database_1 = __importDefault(require("./database"));
//Fetch All tasks
const getTasks = (request, response, next) => {
    database_1.default.query('SELECT * FROM task', (error, results) => {
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
    database_1.default.query('SELECT * FROM task where task.id = $1', [request.params.id], (error, results) => {
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
    const { body } = request;
    database_1.default.query('INSERT INTO task(name, completed, date) VALUES($1, $2, $3)', [body.name, body.completed, body.date], (error, results) => {
        //Send error to middleware error handling function
        if (error)
            return next(error);
        response.status(201).send("Task successfully added");
    });
};
//Update task
const updateTask = (request, response, next) => {
    database_1.default.query('UPDATE task SET name = $1, completed = $2, date = $3 WHERE id = $4;', [request.body.name, request.body.completed, request.body.date, request.params.id], (error, results) => {
        //Send error to middleware error handling function
        if (error)
            return next(error);
        response.status(200).send("Task successfully updated");
    });
};
//Delete task
const deleteTask = (request, response, next) => {
    database_1.default.query('DELETE from task where task.id = $1', [request.params.id], (error, results) => {
        //Send error to middleware error handling function
        if (error)
            return next(error);
        response.status(204).send("Task successfully deleted");
    });
};
//Validate task
const validateTask = (request, response, next) => {
    database_1.default.query('UPDATE task SET completed = $1 WHERE id = $2;', [request.body.completed, request.params.id], (error, results) => {
        //Send error to middleware error handling function
        if (error)
            return next(error);
        response.status(200).send("Task successfully validated");
    });
};
//Search with text
const searchTaskWithText = (request, response, next) => {
    database_1.default.query('SELECT * FROM task where to_tsvector(name) @@ to_tsquery($1)', [request.body.search], (error, results) => {
        //Send error to middleware error handling function
        if (error)
            return next(error);
        //Return 404 not found if result is undefined
        if (typeof results.rows === "undefined")
            response.status(404).json("Task not found");
        response.status(200).json(results.rows);
    });
};
module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    validateTask,
    searchTaskWithText
};
