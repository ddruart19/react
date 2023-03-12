"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express = require('express');
const router = express.Router();
const passport_local_1 = require("passport-local");
const express_validator_1 = require("express-validator");
const bcrypt = require('bcrypt');
const users = require('../services/users.service');
const usersController = require('../controllers/users.controller');
//Passport user serialization
passport_1.default.serializeUser((req, user, done) => {
    done(undefined, user);
});
//Passport user deserialization
passport_1.default.deserializeUser((user, done) => {
    users.getByEmail(user.email).then((userSession) => done(null, userSession));
});
//Passport strategy definition
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async function (email, password, done) {
    try {
        let userDB = await users.getByEmail(email);
        if (!userDB)
            return done(undefined, false, { message: "Invalid email or password" });
        //Password verification
        if (bcrypt.compareSync(password, userDB.password))
            return done(undefined, { id: userDB.id, email: userDB.email });
        else
            return done(undefined, false, { message: "Invalid email or password" });
    }
    catch (err) {
        console.error(`Error while authenticating user`, err.message);
        return done(undefined, false, { message: "Invalid email or password" });
    }
}));
//Error management middleware
const errorManagement = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    return next();
};
//Create
router.post('/', express_validator_1.body('email').isEmail().normalizeEmail(), express_validator_1.body('name').not().isEmpty().trim().escape(), express_validator_1.body('surname').not().isEmpty().trim().escape(), express_validator_1.body('password').not().isEmpty().trim().escape(), errorManagement, usersController.create);
//Authentication
router.post('/login', express_validator_1.body('email').isEmail().normalizeEmail(), express_validator_1.body('password').not().isEmpty().trim().escape(), errorManagement, passport_1.default.authenticate("local"), (req, res) => { res.status(200).json(req.user); });
//Verification
router.post('/isLoggedIn', errorManagement, usersController.isSignedIn);
module.exports = router;
