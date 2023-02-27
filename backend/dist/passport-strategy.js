"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//passport.js
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const database_1 = __importDefault(require("./database"));
const bcrypt = require('bcrypt');
passport.use(new LocalStrategy(function verify(user, cb) {
    //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
    database_1.default.query('SELECT * FROM users WHERE email like $1', user.email, (error, results) => {
        if (bcrypt.compareSync(user.password, results.rows[0].password)) {
            return cb(null, { email: results.rows[0].email }, { message: 'Logged In Successfully' });
        }
        return cb(null, false, { message: 'Incorrect email or password.' });
    });
}));
