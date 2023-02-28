"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import app from "./app";
const compression_1 = __importDefault(require("compression"));
const bodyParser = require('body-parser');
const express = require('express');
const dbmigrate = require('db-migrate');
const helmet_1 = __importDefault(require("helmet"));
const taskQueries = require('./taskQueries');
const app = express();
const cors = require('cors');
const port = 3000;
app.use(helmet_1.default()); // set well-known security-related HTTP headers
app.use(compression_1.default());
app.disable("x-powered-by");
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
//Fetch all tasks
app.get('/api/tasks', taskQueries.getTasks);
//Fetch task by id
app.get('/api/task/:id', taskQueries.getTaskById);
//Create task
app.post('/api/task', taskQueries.createTask);
//Update task
app.put('/api/task/:id', taskQueries.updateTask);
//Delete task
app.delete('/api/task/:id', taskQueries.deleteTask);
//Validate task
app.put('/api/task/validate/:id', taskQueries.validateTask);
//Search task
app.post('/api/task/search', taskQueries.searchTaskWithText);
//Middleware function for errors handling
app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).send('Default error message');
});
var dbm = dbmigrate.getInstance(true);
dbm.sync('20150207135259')
    .then(function () {
    console.log('successfully migrated 12 migrations up');
    return;
});
app.listen(port, () => console.log(`Starting ExpressJS server on Port ${port}`));
