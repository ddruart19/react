import {pool} from "./db.service"

//Create
const create = async (request : Request, response : Response) => {

}

//Read
const get = async (request : Request, response : Response) => {
    const result = await pool.query('SELECT * FROM task')
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
    get,
    update,
    remove
}