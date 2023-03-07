"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tasks = require('../services/tasks.service');
//Create
const create = async (req, res, next) => {
    let task = {
        name: req.body.name,
        completed: req.body.completed,
        date: new Date(req.body.date),
        user_id: req.body.user_id
    };
    try {
        let result = await tasks.create(task);
        if (result > 0)
            return res.status(201).json({ message: "Task successfully created" });
        else
            return res.status(400).json({ message: "Impossible to create task" });
    }
    catch (err) {
        console.error(`Error while creating task`, err.message);
        return res.status(500).send(err.message);
    }
};
//Read
const get = async (req, res, next) => {
    try {
        let result;
        if (req.query.id)
            result = await tasks.getById(req.query.id);
        else if (req.query.name)
            result = await tasks.getByName(req.query.name);
        else
            result = await tasks.getAll();
        if (result)
            return res.status(200).json(result);
        else
            return res.status(404).json({ message: "No task found" });
    }
    catch (err) {
        console.error(`Error while getting tasks`, err.message);
        return res.status(500).send(err.message);
    }
};
//Update
const update = async (req, res, next) => {
    let task = {
        name: req.body.name,
        completed: req.body.completed,
        date: new Date(req.body.date)
    };
    try {
        let result = await tasks.update(req.params.id, task);
        if (result > 0)
            return res.status(201).json({ message: "Task successfully updated " });
        else
            return res.status(400).json({ message: "Impossible to update task" });
    }
    catch (err) {
        console.error(`Error while getting tasks`, err.message);
        return res.status(500).send(err.message);
    }
};
//Delete
const remove = (req, res, next) => {
    try {
        let result = tasks.remove(req.params.id);
        // if(result > 0) res.status(204).json({message : "Task successfully deleted"})
        // else res.status(400).json({message : "Impossible to delete task"})
        return res.status(204).json(result);
    }
    catch (err) {
        console.error(`Error while getting tasks`, err.message);
        return res.status(500).send(err.message);
    }
};
module.exports = {
    get,
    create,
    remove,
    update
};
