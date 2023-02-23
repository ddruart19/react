"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcrypt');
const database_1 = __importDefault(require("./database"));
//Create user
const createUser = (request, response, next) => {
    const { body } = request;
    let hashedPwd = "";
    //Test typeof
    //Test if attributes arent empty
    //Test if email exists in db
    if (isEmailExisting(body.email))
        response.status(409).send("Email already exists");
    //Hash pwd
    bcrypt
        .genSalt(10)
        .then((salt) => {
        console.log('Salt: ', salt);
        return bcrypt.hash(body.password, salt);
    })
        .then((hash) => {
        console.log("body : ", body);
        hashedPwd = hash;
        database_1.default.query('INSERT INTO users(email, name, surname, password) VALUES($1, $2, $3, $4)', [body.email, body.name, body.surname, hashedPwd], (error, results) => {
            //Send error to middleware error handling function
            if (error)
                return next(error);
            response.status(201).send("User successfully created");
        });
    })
        .catch((err) => console.error(err.message));
    // pool.query('INSERT INTO user(email, name, surname, password) VALUES($1, $2, $3, $4)', [body.email, body.name, body.surname, hashedPwd], (error: Error, results: { rows: userDBOutput[]; }) => {
    //     //Send error to middleware error handling function
    //     if(error) return next(error) 
    //     response.status(201).send("User successfully created")
    // })
};
//Check if email exist
const isEmailExisting = async (email) => {
    await database_1.default.query('SELECT * FROM users WHERE email like $1', [email], (error, results) => {
        if (error)
            return error;
        if (results.rows.length > 0)
            return true;
        return false;
    });
    return false;
};
module.exports = {
    createUser
};
