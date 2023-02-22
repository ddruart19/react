"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcrypt');
const database_1 = __importDefault(require("./database"));
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
        console.log("body : ", body);
        database_1.default.query('INSERT INTO user(email, name, surname, password) VALUES($1, $2, $3, $4)', [body.email, body.name, body.surname, body.password], (error, results) => {
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
