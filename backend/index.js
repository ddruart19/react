"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import app from "./app";
const compression_1 = __importDefault(require("compression"));
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const express = require('express');
var session = require('express-session')
const helmet_1 = __importDefault(require("helmet"));
const taskQueries = require('./dist/taskQueries');
const userQueries = require('./dist/userQueries');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const app = express();
const cors = require('cors');
const port = 3001;
app.use(helmet_1.default()); // set well-known security-related HTTP headers
app.use(compression_1.default());
app.disable("x-powered-by");
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true}));
// app.use(
//   session({
//     secret: "this_is_a_secret",
//     resave: true,
//     saveUnitialized: true,
//     rolling: true, // forces resetting of max age
//     cookie: {
//       maxAge: 360000,
//       secure: false // this should be true only when you don't want to show it for security reason
//     }
//   })
// );
/*Initialize Passport*/
// app.use(passport.initialize());
// app.use(passport.session());

const whitelist = ['https://ddruart19.github.io', "http://localhost:3000"];
const corsOptions = {
    origin: "https://ddruart19.github.io",
    methods: 'GET, POST, PUT, DELETE',
    optionsSuccessStatus: 200
}

// app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", corsOptions.origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
  });

//Autorisation de requête http autre que get et post pour cette route
// app.options('/api/task/:id', cors(corsOptions));

// app.options('*', cors(corsOptions));
//Fetch all tasks
app.get('/api/tasks', cors(corsOptions), taskQueries.getTasks);
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


// passport.use(new LocalStrategy(
//     (user, cb) => {
//         //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
//         pool.query('SELECT * FROM users WHERE email like $1', [user.email],(error, results) => {
//             if(bcrypt.compare(user.password, results.rows[0].password)){
//                 return cb(null, {email: results.rows[0].email}, {message: 'Logged In Successfully'});
//             }
//             return cb(null, false, {message: 'Incorrect email or password.'});
            
//         })
//     }
// ));

//Create user
app.post('/api/user', userQueries.createUser);
//Login user
// app.post('/api/user/connection', passport.authenticate('local', {
//     session: false,
//     successRedirect: console.log("Success connection"),
//     failureRedirect: console.log("Fail connection")
//   }));

app.options('*', cors());

app.listen(port, () => console.log(`Starting ExpressJS server on Port ${port}`));

