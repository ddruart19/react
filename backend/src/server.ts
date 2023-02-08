// import app from "./app";
import compression from "compression";

const bodyParser = require('body-parser');
import express from "express";

import helmet from "helmet";
const db = require('./queries');
const app = express()
const port = 3000

app.use(helmet()); // set well-known security-related HTTP headers
app.use(compression());

app.disable("x-powered-by");

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

//Fetch all tasks
app.get('/api/tasks', db.getTasks)
//Fetch task by id
app.get('/api/task/:id', db.getTaskById)
//Create task
app.post('/api/task', db.createTask)




const server = app.listen(port, () =>
    console.log(`Starting ExpressJS server on Port ${port}`));

export default server;
