const express = require('express')
import { NextFunction, Request, Response } from "express"
const bodyParser = require('body-parser')
import compression from "compression"
import helmet from "helmet"
const tasksRouter = require('./routes/tasks.route')
const usersRouter = require('./routes/users.route')
import passport from "passport"
import cors from 'cors'
var session = require('express-session');

const app = express()
const port = process.env.PORT || 3000;
const allowedOrigins = ['http://localhost:3000']

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: 'GET, POST, PUT, DELETE'
}

//import env var from .env file if not in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(cors(corsOptions))

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

//Middleware function to add header in response for CORS POLICY
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000'),
  res.setHeader("Access-Control-Allow-Methods", 'POST, GET, PUT,DELETE'),
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

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