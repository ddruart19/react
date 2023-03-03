const express = require('express')
import { Request, Response } from "express"
const bodyParser = require('body-parser')
import compression from "compression"
import helmet from "helmet"
const tasksRouter = require('./routes/tasks.route');

const app = express()
const port = process.env.PORT || 3000;

app.use(helmet()); // set well-known security-related HTTP headers
app.use(compression());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req : Request, res : Response) => {
    res.json({'message': 'Hello World!'})
  })

app.use('/api/tasks', tasksRouter);

app.listen(port, () =>
    console.log(`Starting ExpressJS server on Port ${port}`)
);
