import passport from "passport"
import { Request, Response } from "express"
const express = require('express')
const router = express.Router()

import { Strategy as LocalStrategy } from 'passport-local'
import { UserDB, UserOutputConnection } from "src/models/users.model"
const bcrypt = require('bcrypt')
const users = require('../services/users.service')


const usersController = require('../controllers/users.controller')


passport.serializeUser<any, any>((req, user, done) => {
    done(undefined, user);
});

passport.deserializeUser((user: UserOutputConnection, done) => {
    users.getByEmail(user.email).then((userSession: boolean | Express.User | null | undefined) => done(null, userSession))
});

//Passport strategy definition
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async function(email: string, password: string, done: Function): Promise<any>{
    try {
        let userDB: UserDB = await users.getByEmail(email)
        if(!userDB) return done(undefined, false, {message: "Invalid email or password"})

        //Password verification
        if(bcrypt.compareSync(password, userDB.password)) return done(undefined, {id: userDB.id, email: userDB.email})
        else return done(undefined, false, {message: "Invalid email or password"})
    } catch (err : any) {
        console.error(`Error while authenticating user`, err.message)
        return done(undefined, false, {message: "Invalid email or password"})
    }
  }
));

//Create
router.post('/', usersController.create)
router.post('/login', passport.authenticate("local"), (req: Request, res: Response) => {res.json(req.user)})



module.exports = router;
export {}