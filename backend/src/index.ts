const express = require('express')
import { Request, Response } from "express"
const bodyParser = require('body-parser')
import compression from "compression"
import helmet from "helmet"
const tasksRouter = require('./routes/tasks.route')
const usersRouter = require('./routes/users.route')
import passport from "passport"
var session = require('express-session');

const app = express()
const port = process.env.PORT || 3000;

//import env var from .env file if not in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

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

app.use('/api/tasks', tasksRouter)

app.use('/api/users', usersRouter)

app.listen(port, () =>
    console.log(`Starting ExpressJS server on Port ${port}`)
);
//Export app to be able to run it as serverless function
module.exports = app