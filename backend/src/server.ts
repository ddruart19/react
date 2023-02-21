// import app from "./app";
import compression from "compression";
const bodyParser = require('body-parser');
const express = require('express');
const dbmigrate = require('db-migrate')
import { Request, Response, NextFunction } from 'express';
import helmet from "helmet";
const db = require('./queries');
const app = express()
const cors = require('cors');
const port = 3000

app.use(helmet()); // set well-known security-related HTTP headers
app.use(compression());

app.disable("x-powered-by");

app.use(cors())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
  )
app.use(bodyParser.json())


//Fetch all tasks
app.get('/api/tasks', db.getTasks)
//Fetch task by id
app.get('/api/task/:id', db.getTaskById)
//Create task
app.post('/api/task', db.createTask)
//Update task
app.put('/api/task/:id', db.updateTask)
//Delete task
app.delete('/api/task/:id', db.deleteTask)
//Validate task
app.put('/api/task/validate/:id', db.validateTask)
//Search task
app.post('/api/task/search', db.searchTaskWithText)


//Middleware function for errors handling
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  res.status(500).send('Default error message')
})

var dbm = dbmigrate.getInstance(true);
dbm.sync('20150207135259')
.then(function() {

  console.log('successfully migrated 12 migrations up');
  return;
});

app.listen(port, () => console.log(`Starting ExpressJS server on Port ${port}`));

