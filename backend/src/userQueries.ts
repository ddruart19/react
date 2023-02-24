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
        if(results.rows.length > 0)response.status(409).json({message: "Email already exists"})
    })
    //Hash pwd
    bcrypt
    .genSalt(10)
    .then((salt: any) => {
        return bcrypt.hash(body.password, salt)
    })
    .then((hash: string) => {
        hashedPwd = hash;
        pool.query('INSERT INTO users(email, name, surname, password) VALUES($1, $2, $3, $4)', [body.email, body.name, body.surname, hashedPwd], (error: Error, results: { rows: userDBOutput[]; }) => {
            //Send error to middleware error handling function
            if(error) return next(error) 
    
            response.status(201).json({message: "User successfully created"})
        })
    })
    .catch((err: { message: any; }) => console.error(err.message))

    // pool.query('INSERT INTO user(email, name, surname, password) VALUES($1, $2, $3, $4)', [body.email, body.name, body.surname, hashedPwd], (error: Error, results: { rows: userDBOutput[]; }) => {
    //     //Send error to middleware error handling function
    //     if(error) return next(error) 

    //     response.status(201).send("User successfully created")
    // })
    
}
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
const authUser = (request : Request, response : Response) => {
    const { body } = request;
    pool.query('SELECT * FROM users WHERE email like $1', [body.email],(error: Error, results: { rows: userDBOutput[]; }) => {
        if(results.rows.length < 1) return response.status(409).json({message: "Wrong email"})
        if(bcrypt.compareSync(body.password, results.rows[0].password)){
            return response.status(200).json({message: "Connection success"})
        }
        
        return response.status(409).json({message: "Wrong password"})
        
    })
}
module.exports ={
    createUser,
    authUser
}