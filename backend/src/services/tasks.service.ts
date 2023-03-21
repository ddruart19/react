import { TaskInputCreate, TaskInputUpdate } from "src/models/tasks.model"
import {pool} from "./db.service"

//Create
const create = async (task: TaskInputCreate) => {
    const result = await pool.query(
        'INSERT INTO task(name, completed, date, user_id) VALUES($1, $2, $3, $4)',
        [task.name, task.completed, task.date, task.user_id])
    return result.rowCount
}

//Read
const getAll = async () => {
    const result = await pool.query('SELECT * FROM task ORDER BY id')
    return result.rows
}
const getByName = async (name: string) => {
    const result = await pool.query('SELECT * FROM task where to_tsvector(name) @@ to_tsquery($1)', 
    [name])
    return result.rows
}
const getById = async (id: number) => {
    const result = await pool.query('SELECT * FROM task where id = $1', 
    [id])
    return result.rows
}


//Update
const update = async (task_id: number, task: TaskInputUpdate) => {
    const result = await pool.query('UPDATE task SET name = $1, completed = $2, date = $3 WHERE id = $4;', 
    [task.name, task.completed, task.date, task_id])
    return result.rowCount
}

//Delete
const remove = async (task_id: number) => {
    const result = await pool.query('DELETE from task where task.id = $1', 
    [task_id])
    return result
}


module.exports = {
    create,
    getAll,
    getByName,
    getById,
    update,
    remove
}