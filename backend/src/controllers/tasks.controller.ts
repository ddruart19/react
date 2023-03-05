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
        if(result > 0) res.status(201).json({message : "Task successfully created"})
        else res.status(400).json({message : "Impossible to create task"})
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
const remove = (req: Request, res: Response, next: NextFunction) => {
    try{
        let result = tasks.remove(req.params.id)
        // if(result > 0) res.status(204).json({message : "Task successfully deleted"})
        // else res.status(400).json({message : "Impossible to delete task"})
        res.status(204).json(result)
    } catch(err: any){
        console.error(`Error while getting tasks`, err.message)
        res.status(500).send(err.message)
    }
}
module.exports = {
    get,
    create,
    remove
}