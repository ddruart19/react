"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_service_1 = require("./db.service");
//Create
const create = async (task) => {
    const result = await db_service_1.pool.query('INSERT INTO task(name, completed, date, user_id) VALUES($1, $2, $3, $4)', [task.name, task.completed, task.date, task.user_id]);
    return result.rowCount;
};
//Read
const getAll = async () => {
    const result = await db_service_1.pool.query('SELECT * FROM task');
    return result.rows;
};
const getByName = async (name) => {
    const result = await db_service_1.pool.query('SELECT * FROM task where to_tsvector(name) @@ to_tsquery($1)', [name]);
    return result.rows;
};
const getById = async (id) => {
    const result = await db_service_1.pool.query('SELECT * FROM task where id = $1', [id]);
    return result.rows;
};
//Update
const update = async (task_id, task) => {
    const result = await db_service_1.pool.query('UPDATE task SET name = $1, completed = $2, date = $3 WHERE id = $4;', [task.name, task.completed, task.date, task_id]);
    return result.rowCount;
};
//Delete
const remove = async (task_id) => {
    const result = await db_service_1.pool.query('DELETE from task where task.id = $1', [task_id]);
    return result;
};
module.exports = {
    create,
    getAll,
    getByName,
    getById,
    update,
    remove
};
