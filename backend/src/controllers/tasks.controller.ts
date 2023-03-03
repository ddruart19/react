import { Request, Response, NextFunction } from "express"

const tasks = require('../services/tasks.service')

//Create

//Read
const get = async (req: Request, res: Response, next: NextFunction) => {
    try{
        if(req.query.name){
            res.json(await tasks.getByName(req.query.name)) 
        }else {
            res.json(await tasks.getAll())
        }
    } catch(err: any) {
        console.error(`Error while getting tasks`, err.message)
    }
}

//Update

//Delete

module.exports = {
    get
}