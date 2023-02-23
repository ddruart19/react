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
    pool.query('SELECT * FROM users WHERE email like $1', [body.email],(error: Error, results: { rows: userDBOutput[]; }) => {
        //Send error to middleware error handling function
        if(error) return next(error) 
        if(results.rows.length > 0)throw new Error('Email already taken');
    })
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


module.exports ={
    createUser
}