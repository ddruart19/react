import { Request, Response, NextFunction } from "express"
import { UserInputCreate } from "src/models/users.model"
const bcrypt = require('bcrypt')

const users = require('../services/users.service')

//Create
const create = async (req: Request, res: Response, next: NextFunction) => {
    try{
        bcrypt
        .genSalt(10)
        .then((salt: any) => {
            return bcrypt.hash(req.body.password, salt)
        })    
        .then(async (hash: string) => {
            let user: UserInputCreate = {
                email: req.body.email,
                name: req.body.name,
                surname: req.body.surname,
                password: hash
            }
            let result = await users.create(user)
            if(result > 0) res.status(201).json({message : "Task successfully created"})
            else res.status(400).json({message : "Impossible to create task"})
        })

    }catch(err: any){
        console.error(`Error while creating task`, err.message)
        res.status(500).send(err.message)

    }
}


module.exports = {
    create
}