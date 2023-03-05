import { TaskInput } from "src/models/tasks.model"
import {pool} from "./db.service"

//Create
const create = async (task: TaskInput) => {
    const result = await pool.query(
        'INSERT INTO task(name, completed, date, user_id) VALUES($1, $2, $3, $4)',
        [task.name, task.completed, task.date, task.user_id])
    return result.rowCount
}

//Read
const getAll = async () => {
    const result = await pool.query('SELECT * FROM task')
    return result.rows
}
const getByName = async (name: string) => {
    const result = await pool.query('SELECT * FROM task where to_tsvector(name) @@ to_tsquery($1)', [name])
    return result.rows
}

//Update
const update = (request : Request, response : Response) => {

}

//Delete
const remove = (request : Request, response : Response) => {

}


module.exports = {
    create,
    getAll,
    getByName,
    update,
    remove
}