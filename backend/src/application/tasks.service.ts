import { Request, Response, NextFunction } from "express"
import { TaskDB, TaskInputCreate, TaskInputUpdate } from "src/models/tasks.model"
import { UserDB } from "src/models/users.model"
const tasks = require('../infrastructure/tasks.repository')
const users = require('../infrastructure/users.repository')



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
        //Get user from cookie session
        let user: UserDB | undefined = await getUserFromRequest(req)
        //Return status 400 if no session found
        if(!user) return res.status(400).json({message : "Impossible to create task"})

        let task: TaskInputCreate = {
            name: req.body.name,
            completed: req.body.completed,
            date: new Date(req.body.date),
            user_id: user!.id
        }
        let result = await tasks.create(task)
        if(result > 0) return res.status(201).json({message : "Task successfully created"})
        else return res.status(400).json({message : "Impossible to create task"})
    }catch(err: any){
        console.error(`Error while creating task`, err.message)
        return res.status(500).send(err.message)

    }
}
//Read
const get = async (req: Request, res: Response, next: NextFunction) => {
    try{
        //Get user from cookie session
        let user: UserDB | undefined = await getUserFromRequest(req)
        //Return status 400 if no session found
        if(!user) return res.status(400).json({message : "Cannot get tasks if not connected"})

        let result: TaskDB[]
        if(req.query.id) result = await tasks.getById(req.query.id)
        else if(req.query.name) result = await tasks.getByName(req.query.name)
        else result = await tasks.getAll()

        if(result){
            result = result.filter(task => task.user_id == user!.id)
            return res.status(200).json(result)
        } 
        else return res.status(404).json({message : "No task found"})
    } catch(err: any) {
        console.error(`Error while getting tasks`, err.message)
        return res.status(500).send(err.message)
    }
}

//Update
const update = async (req: Request, res: Response, next: NextFunction) => {
    let task: TaskInputUpdate = {
        name: req.body.name,
        completed: req.body.completed,
        date: new Date(req.body.date)
    }
    try {
        let result = await tasks.update(req.params.id, task)
        if(result > 0) return res.status(201).json({message : "Task successfully updated "})
        else return res.status(400).json({message : "Impossible to update task"})
    } catch (err: any) {
        console.error(`Error while updating tasks`, err.message)
        return res.status(500).send(err.message)
    }
}

//Delete
const remove = (req: Request, res: Response, next: NextFunction) => {
    try{
        let result = tasks.remove(req.params.id)
        // if(result > 0) res.status(204).json({message : "Task successfully deleted"})
        // else res.status(400).json({message : "Impossible to delete task"})
        return res.status(204).json(result)
    } catch(err: any){
        console.error(`Error while getting tasks`, err.message)
        return res.status(500).send(err.message)
    }
}

module.exports = {
    get,
    create,
    remove,
    update
}