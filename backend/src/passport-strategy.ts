//passport.js
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
import pool from "./database";
const bcrypt = require('bcrypt')


interface userDB {
    id: number;
    email: string;
    name: string;
    surname: string;
    password: string;
}

interface userDBOutput{
    email: string;
}

interface userLoginInput{
    email: string;
    password: string;
}

passport.use(new LocalStrategy(
    function verify(user:userLoginInput, cb: (error: any, user: userDBOutput | false, message: any) => any) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        pool.query('SELECT * FROM users WHERE email like $1', [user.email],(error: Error, results: { rows: userDB[]; }) => {
            if(bcrypt.compareSync(user.password, results.rows[0].password)){
                return cb(null, {email: results.rows[0].email}, {message: 'Logged In Successfully'});
            }
            return cb(null, false, {message: 'Incorrect email or password.'});
            
        })
    }
));