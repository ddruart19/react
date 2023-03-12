import { Request, Response, NextFunction } from "express"
import { UserDB, UserInputCreate } from "src/models/users.model"
const bcrypt = require('bcrypt')

const users = require('../services/users.service')

//Format sessionId string from cookie info
const formatSessionId = (sessionId: string) => {
    return sessionId.slice(2, 34)
}

//Get user from request
const getUserFromRequest = async (req: Request) => {
    if(req.cookies['connect.sid']){
        //Get sessionId from request
        let sessionId: string = formatSessionId(req.cookies['connect.sid'])
        //Get user with sessionId
        let user!: UserDB 
        await users.getBySessionId(sessionId).then((res: UserDB) => user = res)
        return user 
    }
    return undefined
}

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
        return res.status(500).send(err.message)
    }
    return 
}

//Sign In verification
const isSignedIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //Get user from cookie session
        let user: UserDB | undefined = await getUserFromRequest(req)
        //Return status 400 if no session found
        if(!user) return res.status(400).json({message : "Session not found"})
        else return res.status(200).json({message : "Session found"})
    } catch (err: any) {
        console.error(`Error while checking if signed in`, err.message)
        return res.status(500).send(err.message)
    }
}

module.exports = {
    create,
    isSignedIn
}