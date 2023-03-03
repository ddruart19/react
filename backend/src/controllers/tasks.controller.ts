import { Request, Response, NextFunction } from "express"

const tasks = require('../services/tasks.service')

//Read
const get = async (req: Request, res: Response, next: NextFunction) => {
    try{
        res.json(await tasks.get())
    } catch(err: any) {
        console.error(`Error while getting tasks`, err.message)
    }
}

module.exports = {
    get
}