import { Request, Response, NextFunction } from "express";
const bcrypt = require('bcrypt')
import pool from "./database";


interface userDBOutput {
    id: number;
    email: string;
    name: string;
    surname: string;
    password: string;
}

//Create user
const createUser = (request : Request, response : Response, next: NextFunction) => {
    const { body } = request;
    let hashedPwd: string = ""
    //Test typeof
    
    //Test if attributes arent empty

    //Test if email exists in db
    if(isEmailExisting(body.email)) response.status(409).send("Email already exists")
    //Hash pwd
    bcrypt
    .genSalt(10)
    .then((salt: any) => {
        console.log('Salt: ', salt)
        return bcrypt.hash(body.password, salt)
    })
    .then((hash: string) => {
        console.log("body : ", body)
        hashedPwd = hash;
        pool.query('INSERT INTO users(email, name, surname, password) VALUES($1, $2, $3, $4)', [body.email, body.name, body.surname, hashedPwd], (error: Error, results: { rows: userDBOutput[]; }) => {
            //Send error to middleware error handling function
            if(error) return next(error) 
    
            response.status(201).send("User successfully created")
        })
    })
    .catch((err: { message: any; }) => console.error(err.message))

    // pool.query('INSERT INTO user(email, name, surname, password) VALUES($1, $2, $3, $4)', [body.email, body.name, body.surname, hashedPwd], (error: Error, results: { rows: userDBOutput[]; }) => {
    //     //Send error to middleware error handling function
    //     if(error) return next(error) 

    //     response.status(201).send("User successfully created")
    // })
    
}

//Check if email exist
const isEmailExisting = async (email: string) => {
    await pool.query('SELECT * FROM users WHERE email like $1', [email], (error: Error, results: { rows: userDBOutput[]; }) => {
        if(error) return error
        if(results.rows.length > 0) return true
        return false
    })
    return false
}

module.exports ={
    createUser
}