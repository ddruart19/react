"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const tasksRouter = require('./routes/tasks.route');
const usersRouter = require('./routes/users.route');
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
var session = require('express-session');
const db_service_1 = require("./services/db.service");
const poolSession = new (require('connect-pg-simple')(session))({
    pool: db_service_1.pool
});
const app = express();
const port = process.env.PORT || 3001;
// const allowedOrigins = 'https://ddruart19.github.io'
const allowedOrigins = 'http://localhost:3000';
const corsOptions = {
    origin: allowedOrigins,
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
};
//import env var from .env file if not in production
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
app.set("trust proxy", 1);
app.use(cors_1.default(corsOptions));
app.use(session({
    store: poolSession,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: 'none',
        secure: true
    }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// app.use(passport.authenticate('session'))
app.use(helmet_1.default()); // set well-known security-related HTTP headers
app.use(compression_1.default());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true,
}));
//Middleware function to add header in response for CORS POLICY
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", 'POST, GET, PUT,DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override, Set-Cookie, Cookie");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Referrer-Policy', 'no-referrer');
    next();
});
app.get('/', (req, res) => {
    res.json({ 'message': 'Hello World!' });
});
app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter);
app.listen(port, () => console.log(`Starting ExpressJS server on Port ${port}`));
//Export app to be able to run it as serverless function
module.exports = app;
