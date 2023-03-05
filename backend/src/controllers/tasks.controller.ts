import { Request, Response, NextFunction } from "express"

const tasks = require('../services/tasks.service')

//Create

//Read
const get = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let result = req.query.name ? await tasks.getByName(req.query.name) : await tasks.getAll()
        if(result.length > 0) res.status(200).json(result)
        else res.status(404).json({message : "No task found"})
    } catch(err: any) {
        console.error(`Error while getting tasks`, err.message)
    }
}

//Update

//Delete

module.exports = {
    get
}