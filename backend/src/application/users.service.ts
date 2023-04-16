import { Request, Response, NextFunction } from "express"
import { UserDB, UserInputCreate } from "src/models/users.model"
import { TokenDB } from "src/models/tokenResetPwd.model"
const bcrypt = require('bcrypt')

const users = require('../infrastructure/users.repository')
const resetPwd = require('../infrastructure/tokenResetPwd.repository')

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

//Update
const update = async (req: Request, res: Response, next: NextFunction) => {

    try {
        let tokenReset: TokenDB | undefined = undefined
        await resetPwd.getByToken(req.body.token).then((token: TokenDB) => {tokenReset = token})
        if(tokenReset){
            //Password crypting
            bcrypt
            .genSalt(10)
            .then((salt: any) => {
                return bcrypt.hash(req.body.password, salt)
            })    
            .then(async (hash: string) => {
                let result = await users.updatePwd(tokenReset!.user_id, hash)
                if(result > 0) return res.status(201).json({message : "Password successfully updated"})
                else return res.status(400).json({message : "Impossible to change password"})
            })
        }
        return res.status(400).json({message : "Impossible to change password"})
    } catch (err: any) {
        console.error(`Error while changing password`, err.message)
        return res.status(500).send(err.message)
    }
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

//Forgotten password
const forgottenPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //Check if email exists
        if(await users.getByEmail(req.query.email))return res.status(200).json({email : req.query.email})
        else return res.status(401).json({message : "Email doesnt exist"})
    } catch (err: any) {
        console.error(`Error while trying to reset password`, err.message)
        return res.status(500).send(err.message)
    }
}

//Ask for password reset
const sendEmailPwdReset = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let userId: number | undefined = undefined
        await users.getByEmail(req.query.email).then((user: UserDB) => {if(user)userId = user.id})
        if(userId){
            //Check if there is already an entry in token db for that user id
            let token: TokenDB | undefined = undefined
            await resetPwd.getByUserId(userId).then((res : TokenDB) => token = res)
            if(token) return res.status(401).json({message : "Email already sent"})

            users.setTokenForgottenPwd(userId)
            return res.status(200).json({message : "An email with password reset was sent to this address"})
        }
        return res.status(401).json({message : "Email doesnt exist"})
    } catch (err : any) {
        console.error(`Error while setting reset pwd token`, err.message)
        return res.status(500).send(err.message)
    }

}


module.exports = {
    create,
    update,
    isSignedIn,
    forgottenPassword,
    sendEmailPwdReset,

}