import { Request, Response, NextFunction } from "express"
import { UserInputCreate } from "src/models/users.model"
const bcrypt = require('bcrypt')

const users = require('../services/users.service')


//Create
const create = async (req: Request, res: Response, next: NextFunction) => {
    try{
        //Check if email already exists
        if(await users.getByEmail(req.body.email))return res.status(400).json({message : "Email already exists"})

        //Password crypting
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
            if(result > 0) res.status(201).json({message : "User successfully created"})
            else res.status(400).json({message : "Impossible to create user"})
        })

    }catch(err: any){
        console.error(`Error while creating user`, err.message)
        res.status(500).send(err.message)
    }
    return 
}

//Authentication
// const authentication = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         let userDB: UserDB = await users.getByEmail(req.body.email)
//         if(!userDB) res.status(409).json({message : "Wrong email/password"})

//         //Password verification
//         if(bcrypt.compareSync(req.body.password, userDB.password)) res.status(200).json({message: "Connection success"})
//         else res.status(409).json({message : "Wrong email/password"})
//     } catch (err : any) {
//         console.error(`Error while authenticating user`, err.message)
//         res.status(500).send(err.message)
//     }
// }


module.exports = {
    create
}