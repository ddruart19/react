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
    database_1.default.query('SELECT * FROM users WHERE email like $1', [body.email], (error, results) => {
        //Send error to middleware error handling function
        if (error)
            return next(error);
        if (results.rows.length > 0)
            response.status(409).json({ message: "Email already exists" });
    });
    //Hash pwd
    bcrypt
        .genSalt(10)
        .then((salt) => {
        return bcrypt.hash(body.password, salt);
    })
        .then((hash) => {
        hashedPwd = hash;
        database_1.default.query('INSERT INTO users(email, name, surname, password) VALUES($1, $2, $3, $4)', [body.email, body.name, body.surname, hashedPwd], (error, results) => {
            //Send error to middleware error handling function
            if (error)
                return next(error);
            response.status(201).json({ message: "User successfully created" });
        });
    })
        .catch((err) => console.error(err.message));
    // pool.query('INSERT INTO user(email, name, surname, password) VALUES($1, $2, $3, $4)', [body.email, body.name, body.surname, hashedPwd], (error: Error, results: { rows: userDBOutput[]; }) => {
    //     //Send error to middleware error handling function
    //     if(error) return next(error) 
    //     response.status(201).send("User successfully created")
    // })
};
//Get user by email
// const getUserByEmail = async (email: string) => {
//     let user!: userDBOutput;
//     await pool.query('SELECT * FROM users WHERE email like $1', [email],(error: Error, results: { rows: userDBOutput[]; }) => {
//         //Send error to middleware error handling function
//         if(error || !results.rows) return undefined
//         user = results.rows[0]
//     })
//     return user;
// }
//User Authentication
const authUser = (request, response) => {
    const { body } = request;
    database_1.default.query('SELECT * FROM users WHERE email like $1', [body.email], (error, results) => {
        if (results.rows.length < 1)
            return response.status(409).json({ message: "Wrong email" });
        if (bcrypt.compareSync(body.password, results.rows[0].password)) {
            return response.status(200).json({ message: "Connection success" });
        }
        return response.status(409).json({ message: "Wrong password" });
    });
};
module.exports = {
    createUser,
    authUser
};
