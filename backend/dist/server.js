"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import app from "./app";
const compression_1 = __importDefault(require("compression"));
const bodyParser = require('body-parser');
const express = require('express');
const helmet_1 = __importDefault(require("helmet"));
const db = require('./queries');
const app = express();
const cors = require('cors');
const port = 3001;
app.use(helmet_1.default()); // set well-known security-related HTTP headers
app.use(compression_1.default());
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true,
}));
//Fetch all tasks
app.get('/api/tasks', db.getTasks);
//Fetch task by id
app.get('/api/task/:id', db.getTaskById);
//Create task
app.post('/api/task', db.createTask);
//Update task
app.put('/api/task/:id', db.updateTask);
//Delete task
app.delete('/api/task/:id', db.deleteTask);
//Validate task
app.put('/api/task/validate/:id', db.validateTask);
app.listen(port, () => console.log(`Starting ExpressJS server on Port ${port}`));
