"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcrypt');
const users = require('../services/users.service');
//Format sessionId string from cookie info
const formatSessionId = (sessionId) => {
    return sessionId.slice(2, 34);
};
//Get user from request
const getUserFromRequest = async (req) => {
    if (req.cookies['connect.sid']) {
        //Get sessionId from request
        let sessionId = formatSessionId(req.cookies['connect.sid']);
        //Get user with sessionId
        let user;
        await users.getBySessionId(sessionId).then((res) => user = res);
        return user;
    }
    return undefined;
};
//Create
const create = async (req, res, next) => {
    try {
        //Check if email already exists
        if (await users.getByEmail(req.body.email))
            return res.status(400).json({ message: "Email already exists" });
        //Password crypting
        bcrypt
            .genSalt(10)
            .then((salt) => {
            return bcrypt.hash(req.body.password, salt);
        })
            .then(async (hash) => {
            let user = {
                email: req.body.email,
                name: req.body.name,
                surname: req.body.surname,
                password: hash
            };
            let result = await users.create(user);
            if (result > 0)
                res.status(201).json({ message: "User successfully created" });
            else
                res.status(400).json({ message: "Impossible to create user" });
        });
    }
    catch (err) {
        console.error(`Error while creating user`, err.message);
        return res.status(500).send(err.message);
    }
    return;
};
//Sign In verification
const isSignedIn = async (req, res, next) => {
    try {
        //Get user from cookie session
        let user = await getUserFromRequest(req);
        //Return status 400 if no session found
        if (!user)
            return res.status(400).json({ message: "Session not found" });
        else
            return res.status(200).json({ message: "Session found" });
    }
    catch (err) {
        console.error(`Error while checking if signed in`, err.message);
        return res.status(500).send(err.message);
    }
};
module.exports = {
    create,
    isSignedIn
};
