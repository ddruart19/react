"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const bodyParser = require('body-parser');
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const tasksRouter = require('./routes/tasks.route');
const usersRouter = require('./routes/users.route');
const app = express();
const port = process.env.PORT || 3000;
app.use(helmet_1.default()); // set well-known security-related HTTP headers
app.use(compression_1.default());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.get('/', (req, res) => {
    res.json({ 'message': 'Hello World!' });
});
app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter);
app.listen(port, () => console.log(`Starting ExpressJS server on Port ${port}`));
