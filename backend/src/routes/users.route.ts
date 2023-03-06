import passport from "passport"
import { NextFunction, Request, Response } from "express"
const express = require('express')
const router = express.Router()
import { Strategy as LocalStrategy } from 'passport-local'
import { UserDB, UserOutputConnection } from "src/models/users.model"
import { body, validationResult } from "express-validator"
const bcrypt = require('bcrypt')
const users = require('../services/users.service')
const usersController = require('../controllers/users.controller')

//Passport user serialization
passport.serializeUser<any, any>((req, user, done) => {
    done(undefined, user);
});

//Passport user deserialization
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

//Error management middleware
const errorManagement = (req: Request, res: Response, next: NextFunction) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next()
  }

//Create
router.post('/',
    body('email').isEmail().normalizeEmail(),
    body('name').not().isEmpty().trim().escape(),
    body('surname').not().isEmpty().trim().escape(),
    body('password').not().isEmpty().trim().escape(),
    errorManagement,
    usersController.create
)

//Authentication
router.post('/login',
    body('email').isEmail().normalizeEmail(),
    body('password').not().isEmpty().trim().escape(),
    errorManagement, 
    passport.authenticate("local"), 
    (req: Request, res: Response) => {res.json(req.user)}
)



module.exports = router;
export {}