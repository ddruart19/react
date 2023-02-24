//passport.js
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
import pool from "./database";
import { sessionUser } from "./interfaces";
const bcrypt = require('bcrypt')


interface userDBOutput {
    id: number;
    email: string;
    name: string;
    surname: string;
    password: string;
}



passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    function (email: string, password:string, cb: (error: any, user: boolean, message: any) => any) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        pool.query('SELECT * FROM users WHERE email like $1', email,(error: Error, results: { rows: userDBOutput[]; }) => {
            if(bcrypt.compareSync(password, results.rows[0].password)){
                return cb(null, true, {message: 'Logged In Successfully'});
            }
            return cb(null, false, {message: 'Incorrect email or password.'});
            
        })
    }
));