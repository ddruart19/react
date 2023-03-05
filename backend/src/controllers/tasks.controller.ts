import { Request, Response, NextFunction } from "express"
import { TaskInput } from "src/models/tasks.model"

const tasks = require('../services/tasks.service')

//Create
const create = async (req: Request, res: Response, next: NextFunction) => {
    let task: TaskInput = {
        name: req.body.name,
        completed: req.body.completed,
        date: new Date(req.body.date),
        user_id: req.body.user_id
    }
    try{
        let result = await tasks.create(task)
        res.status(200).send(result)
    }catch(err: any){
        console.error(`Error while creating task`, err.message)
        res.status(500).send(err.message)

    }
}
//Read
const get = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let result = req.query.name ? await tasks.getByName(req.query.name) : await tasks.getAll()
        if(result.length > 0) res.status(200).json(result)
        else res.status(404).json({message : "No task found"})
    } catch(err: any) {
        console.error(`Error while getting tasks`, err.message)
        res.status(500).send(err.message)
    }
}

//Update

//Delete

module.exports = {
    get,
    create
}