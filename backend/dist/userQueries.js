"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcrypt');
const pool = require('./database');
// interface userDBInput {
//     email: string;
//     name: string;
//     surname: string;
//     password: string;
// }
//Create user
const createUser = (request, response, next) => {
    const { body } = request;
    //Test typeof
    //Test if attributes arent empty
    //Hash pwd
    bcrypt
        .genSalt(10)
        .then((salt) => {
        console.log('Salt: ', salt);
        return bcrypt.hash(body.password, salt);
    })
        .then((hash) => {
        pool.query('INSERT INTO user(email, name, surname, password) VALUES($1, $2, $3, $4)', [body.email, body.name, body.surname, hash], (error, results) => {
            //Send error to middleware error handling function
            if (error)
                return next(error);
            response.status(201).send("User successfully created");
        });
    })
        .catch((err) => console.error(err.message));
};
module.exports = {
    createUser
};
